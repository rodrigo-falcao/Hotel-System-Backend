import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { join, resolve } from "path";
import { PrismaService } from "../prisma/prisma.service";
import { stat, unlink } from "fs/promises";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import { User } from "@prisma/client";
import { userSelectFields } from "../prisma/utils/userSelectFields";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService, 
    ) {}

    list() {
        return this.prisma.user.findMany({
            select: userSelectFields
        });
    }
    async createUser(body: CreateUserDTO): Promise<User> {
        const user = await this.findByEmail(body.email);
        if (user) {
            throw new BadRequestException(`Email is already registered!`);
        }
        
        body.password = await this.hashPassword(body.password);
        return await this.prisma.user.create({ 
            data: body, 
            select: userSelectFields
        });
    }
    async show(id: number) {
        const user = await this.isIdExists(id);

        return user;
    }
    async updateUser(id: number, body: UpdateUserDTO) {
        await this.isIdExists(id);

        if (body.password) {
            body.password = await this.hashPassword(body.password);
        }
        return this.prisma.user.update({ 
            where: { id }, 
            data: body,
            select: userSelectFields
        });
    }
    async deleteUser(id: number) {
        await this.isIdExists(id);

        return this.prisma.user.delete({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async uploadAvatar(id: number, avatarFilename: string) {
        const user = await this.isIdExists(id);
        const directory = resolve (__dirname, '..', '..', '..', 'uploads');

        if (user.avatar) {
            const userAvatarFilePath = join(directory, user.avatar);
            try {
                await stat(userAvatarFilePath);
                await unlink(userAvatarFilePath);
            } catch {
                // Arquivo não existe, ignora o erro
            }
        }
        const userUpdated = await this.updateUser(id, { avatar: avatarFilename });

        return userUpdated;
    } 

    private async isIdExists(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id }, select: userSelectFields });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
}