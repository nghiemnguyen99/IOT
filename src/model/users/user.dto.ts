import { IsString, IsEmail } from "class-validator";

class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
  public firstname: string;
  public role: string;
  public deviceid: string;
}

export default CreateUserDto;
