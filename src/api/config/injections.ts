import { CreateInvestor } from "../../domain/use-cases/investor/create-investor.usecase";
import { CreateShare } from "../../domain/use-cases/share/create-share.usecase";
import { CreateExpectations } from "../../domain/use-cases/expectation/create-expectations.usecase";
import { ShareMemoryRepository } from "../../infrastructure/repositories/in-memory/share-memory.repository";
import { ExpectationMemoryRepository } from "../../infrastructure/repositories/in-memory/expectation-memory.repository";
import { InvestorRepository } from "../../infrastructure/repositories/mongodb/investor.repository";
import { AuthController } from "../controllers/auth.controller";
import { Login } from "../../domain/use-cases/investor/login.usecase";
import { ShareController } from "../controllers/share.controller";
import { ShareUsecase } from "../../domain/use-cases/share/share.usecase";
import { ShareRepository } from "../../infrastructure/repositories/mongodb/share.repository";
import { ExpectationRepository } from "../../infrastructure/repositories/mongodb/expectation.repository";
import { ExpectationUsecase } from "../../domain/use-cases/expectation/expectation.usecase";
import { ExpectationController } from "../controllers/expectation.controller";

// repository
const investorRepository = new InvestorRepository();
const shareRepository = new ShareRepository();
const expectationRepository = new ExpectationRepository();

// use cases
const createInvestor = new CreateInvestor(investorRepository);
const loginInvestor = new Login(investorRepository);
const createShare = new CreateShare(shareRepository);
const shareUsecase = new ShareUsecase(shareRepository);
const createExpectation = new CreateExpectations(expectationRepository);
const expectationUsecase = new ExpectationUsecase(expectationRepository);

// controller
const authController = new AuthController(createInvestor, loginInvestor);
const shareController = new ShareController(createShare, shareUsecase);
const expectationController = new ExpectationController(expectationUsecase);

export { authController, shareController, expectationController };