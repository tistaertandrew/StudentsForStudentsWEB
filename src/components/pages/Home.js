import {ObservedNavBar} from "../templates/NavBar";
import {observer} from "mobx-react";
import {homeStore} from "../../stores/HomeStore";
import {useEffect} from "react";
import LeftImage from '../../assets/images/tired.png'

function Home() {
    useEffect(async () => {
        await homeStore.init()
    }, [])

    return (
        <div>
            <ObservedNavBar />
            <div className={'home-main-container'}>
                <div className={'column'} style={{justifyContent: 'center'}}>
                    <h1 className={'home-main-title'}>Students for Students</h1>
                    <h2 className={'home-main-p'}>Une plateforme pour les étudiants, faites par les étudiants</h2>
                    <div className={'row'}>
                        <div className={'column'}>
                            <h1 className={'home-main-key'}>{homeStore.usersCount}</h1>
                            <h2 className={'home-main-value'}>Utilisateur(s) inscrit(s)</h2>
                        </div>
                        <div className={'column'}>
                            <h1 className={'home-main-key'}>{homeStore.filesCount}</h1>
                            <h2 className={'home-main-value'}>Synthèse(s) disponible(s)</h2>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-green'} value={'SE CONNECTER'}/>
                        </div>
                        <div className={'column'}>
                            <input type={'submit'} className={'btn-home-brown'} value={'PLUS D\'INFORMATIONS'}/>
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