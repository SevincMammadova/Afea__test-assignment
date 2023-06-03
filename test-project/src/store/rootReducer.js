import { homePageReducer, homePageSliceName} from "../pages/HomePage";


export const rootReducer = {
    [homePageSliceName]: homePageReducer,
};