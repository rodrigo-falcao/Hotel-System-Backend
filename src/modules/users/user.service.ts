import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import * as bcrypt from 'bcrypt';
import { userSelectFields } from "../prisma/utils/userSelectFields";


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    list() {
        return this.prisma.user.findMany({
            select: userSelectFields
        });
    }
    async createUser(body: CreateUserDTO): Promise<User> {
        body.password = await this.hashPassword(body.password);
        const existingUserEmail = await this.prisma.user.findUnique({ where: { email: body.email } });

        if (existingUserEmail) {
            throw new ConflictException(`Email is already registered!`);
        }
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