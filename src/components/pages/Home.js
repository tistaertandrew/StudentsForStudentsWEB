import {ObservedNavBar} from "../templates/NavBar";
import {observer} from "mobx-react";
import {homeStore} from "../../stores/HomeStore";
import {useEffect} from "react";
import LeftImage from '../../assets/images/home.png'
import {useNavigate} from "react-router-dom";
import routes from '../../routes.json'
import {sessionStore} from "../../stores/SessionStore";

function Home() {
    const navigate = useNavigate()

    useEffect(async () => {
        await homeStore.init()
    }, [])

    const navigateToAuthentication = () => {
        navigate(routes.Authentication)
    }

    const navigateToAbout = () => {
        navigate(routes.About)
    }

    const navigateToSyntheses = () => {
        navigate(routes.Syntheses)
    }

    return (
        <div>
            <ObservedNavBar/>
            <div className={'home-main-container'}>
                <div className={'column'} style={{justifyContent: 'center'}}>
                    <h1 className={'home-main-title'}>Students for Students.</h1>
                    <h2 className={'home-main-p'}>Une plateforme pour les étudiants, faites par les étudiants.</h2>
                    <div className={'row'}>
                        <div className={'column'}>
                            <h1 className={'home-main-key'}>{homeStore.usersCount < 9 ? `0${homeStore.usersCount}` : homeStore.usersCount}</h1>
                            <h2 className={'home-main-value'}>Utilisateur(s) inscrit(s)</h2>
                        </div>
                        <div className={'column'}>
                            <h1 className={'home-main-key'}>{homeStore.filesCount < 9 ? `0${homeStore.filesCount}` :
                                <homeStore className="gi"></homeStore>}</h1>
                            <h2 className={'home-main-value'}>Synthèse(s) disponible(s)</h2>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-green'}
                                   value={sessionStore.user ? 'VOIR LES SYNTHESES' : 'SE CONNECTER'}
                                   onClick={sessionStore.user ? navigateToSyntheses : navigateToAuthentication}/>
                        </div>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-brown'} value={'PLUS D\'INFORMATIONS'}
                                   onClick={navigateToAbout}/>
                        </div>
                    </div>
                </div>
                <div className={'column'} style={{justifyContent: 'center'}}>
                    <img src={LeftImage} alt={'image page d\'accueil'} className={'home-main-image'}/>
                </div>
            </div>
        </div>
    )
}

export const ObservedHome = observer(Home);