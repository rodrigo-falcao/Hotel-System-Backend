import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    list() {
        return this.prisma.user.findMany();
    }
    createUser(body: any): Promise<User> {
        return this.prisma.user.create({ data: body });
    }
    async show(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        return user;
    }
    async updateUser(id: string, body: any) {
        const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        return this.prisma.user.update({
            where: { id: Number(id) },
            data: body
        });
    }
    async deleteUser(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        return this.prisma.user.delete({ where: { id: Number(id) } });
    }
}