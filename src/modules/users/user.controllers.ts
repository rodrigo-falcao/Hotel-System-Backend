import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./domain/dto/createUser.dto";
import { UpdateUserDTO } from "./domain/dto/updateUser.dto";
import { ParamId } from "src/shared/decorators/paramId.decorator";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { User } from "src/shared/decorators/user.decorator";
import { User as UserType } from "@prisma/client";


@UseGuards(AuthGuard)
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

    @Post()
    createUser(@Body() body: CreateUserDTO) {
        return this.userService.createUser(body);
    }

    @Patch(':id')
    updateUser(@ParamId() id: number, @Body() body: UpdateUserDTO) {
        return this.userService.updateUser(id, body);
    }

    @Delete(':id')
    deleteUser(@ParamId() id: number) {
        return this.userService.deleteUser(id);
    }
}