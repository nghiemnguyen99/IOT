import { IsString, IsEmail } from "class-validator";

class CreateUserDto {
  @IsString()
  public lastname: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
  public firstname: string;
}

export default CreateUserDto;
