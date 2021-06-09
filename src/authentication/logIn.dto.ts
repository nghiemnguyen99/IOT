import { IsString } from "class-validator";

class LogInDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
  @IsString()
  public role: string;
}

export default LogInDto;
