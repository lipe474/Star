import { inject, injectable } from "tsyringe";
import "reflect-metadata";
import { IMedicsRepository } from "@modules/medics/repositories/IMedicsRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { IMedicsTokensRepository } from "@modules/medics/repositories/IMedicsTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import auth from "@config/auth";
import { IResidentsRepository } from "@modules/residents/repositories/IResidentsRepository";
import { ITeachersRepository } from "@modules/teachers/repositories/ITeachersRepository";

interface IRequest {
  id: string;
  cpf: string;
  password: string;
}

interface IResponse {
  medic: {
    name: string;
    cpf: string;
  };
  token: string;
  // refresh_token: string;
}

@injectable()
class AuthenticateMedicUseCase {
  constructor(
    @inject("MedicsRepository")
    private medicsRepository: IMedicsRepository,
    @inject("ResidentsRepository")
    private residentsRepository: IResidentsRepository,
    @inject("TeachersRepository")
    private teachersRepository: ITeachersRepository // @inject("MedicsTokensRepository")
  ) // private medicsTokensRepository: IMedicsTokensRepository,
  // @inject("DayjsDateProvider")
  // private dateProvider: IDateProvider
  {}

  async execute({ cpf, password, id }: IRequest): Promise<IResponse> {
    let medic: any;
    if (id === "1") {
      medic = await this.medicsRepository.findByCpf(cpf);
    } else if (id === "2") {
      medic = await this.residentsRepository.findByCpf(cpf);
    } else if (id === "3") {
      medic = await this.teachersRepository.findByCpf(cpf);
    }

    const {
      expires_in_token,
      // secret_refresh_token,
      secret_token,
      // expires_in_refresh_token,
      // expires_refresh_token_days,
    } = auth;

    if (!medic) {
      throw new AppError("Cpf or password incorrect!");
    }

    const passwordMatch = await compare(password, medic.password);

    if (!passwordMatch) {
      throw new AppError("Cpf or password incorrect!");
    }

    const token = sign({}, secret_token, {
      subject: medic.id,
      expiresIn: expires_in_token,
    });

    // const refresh_token = sign({ cpf }, secret_refresh_token, {
    //   subject: medic.id,
    //   expiresIn: expires_in_refresh_token,
    // });

    // const refresh_token_expires_date = this.dateProvider.addDays(
    //   expires_refresh_token_days
    // );

    // await this.medicsTokensRepository.create({
    //   medic_id: id === "1" ? medic.id : null,
    //   resident_id: id === "2" ? medic.id : null,
    //   teacher_id: id === "3" ? medic.id : null,
    //   refresh_token,
    //   expires_date: refresh_token_expires_date,
    // });

    const tokenReturn: IResponse = {
      token,
      medic: {
        name: medic.name,
        cpf: medic.cpf,
      },
      // refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateMedicUseCase };
