import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    list() {
        return this.prisma.user.findMany();
    }
    async createUser(body: CreateUserDTO): Promise<User> {
        const existingUser = await this.prisma.user.findUnique({ where: { email: body.email } });

        if (existingUser) {
            throw new ConflictException(`Email is already registered!`);
        }
        return this.prisma.user.create({ data: body });
    }
    async show(id: number) {
        const user = await this.isIdExists(id);

        return user;
    }
    async updateUser(id: number, body: UpdateUserDTO) {
        this.isIdExists(id);

        return this.prisma.user.update({ where: { id }, data: body });
    }
    async deleteUser(id: number) {
        this.isIdExists(id);

        return this.prisma.user.delete({ where: { id } });
    }

    private async isIdExists(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }
}