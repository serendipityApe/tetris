import { MultGame } from "../components/multGame";
import { Options } from "../components/options/options";
import { SingleGame } from "../components/singleGame";
import ConfigMult from "../pages/configMult";
import Help from "../pages/help";
import More from "../pages/more";
type Router = {
    path: string,
    component: any,
    exact?: boolean,
    routers?: object[],
    childs?: Router
}[]
export const mainRouter: Router = [
    {
        path: '/mult',
        component: ConfigMult,
        // childs: [
        //     {
        //         path: ':roomid',
        //         component: MultGame
        //     }
        // ]
    },
    {
        path: '/single',
        component: SingleGame
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '/more',
        component: More
    },
    {
        path: '/mult/:roomid',
        component: MultGame
    },
    {
        path: '/',
        component: Options,
    }
]