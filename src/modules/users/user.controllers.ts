import { AuthGuard } from "src/shared/guards/auth.guard";
import { Body, Controller, Delete, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ParamId } from "src/shared/decorators/paramId.decorator";
import { Role, User as UserType } from "@prisma/client";
import { RoleGuard } from "src/shared/guards/role.guard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { ThrottlerGuard } from "@nestjs/throttler";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import { User } from "src/shared/decorators/user.decorator";
import { UserMathGuard } from "src/shared/guards/user.guard";
import { UserService } from "./user.service";

@UseGuards(AuthGuard, RoleGuard, ThrottlerGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    list(@User() user: UserType) {
        console.log(user);
        return this.userService.list();
    }

    @Get(':id')
    show(@ParamId() id: number) {
        return this.userService.show(id);
    }

    @Roles(Role.ADMIN, Role.USER)
    @Post()
    createUser(@Body() body: CreateUserDTO) {
        return this.userService.createUser(body);
    }

    @UseGuards(UserMathGuard)
    @Patch(':id')
    updateUser(@ParamId() id: number, @Body() body: UpdateUserDTO) {
        return this.userService.updateUser(id, body);
    }

    @UseGuards(UserMathGuard)
    @Delete(':id')
    deleteUser(@ParamId() id: number) {
        return this.userService.deleteUser(id);
    }

    @UseInterceptors(FileInterceptor('avatar'))
    @Post('avatar')
    uploadAvatar(@UploadedFile() avatar: Express.Multer.File) {
        console.log(avatar);
        return true
        // return this.userService.uploadAvatar(user);
    }
}