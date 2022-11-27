import {ObservedNavBar} from "../templates/NavBar";
import {useNavigate} from "react-router-dom";
import routes from '../../routes.json'
import RightImage from "../../assets/images/tired.png";
import {DoNotDisturbOn} from "@mui/icons-material";

export default function NotFound() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate(routes.Home)
    }

    return (
        <div>
            <ObservedNavBar/>
            <div className={'auth-grid'}>
                <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                    <img src={RightImage} alt={'students'} className={'hero-banner-img'}/>
                </div>
                <div className={'column'}>
                    <div className={'container-title-auth'}>
                        <DoNotDisturbOn className={'icon-auth'}/>
                        <h1 className={'title-auth'}>PAGE INTROUVABLE</h1>
                        <p className={'text-about'}>
                            Le chemin que vous avez décidé d'emprunter ne mène nulle part.
                            N'hésitez pas à revenir à la page d'accueil pour revenir sur le droit chemin.
                        </p>
                        <input type={'submit'} className={'btn-auth'}
                               value={'RETOUR À L\'ACCUEIL'}
                               onClick={() => navigateToHome()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}