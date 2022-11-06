import RightImage from "../../assets/images/devs.png";

export default function AboutContent() {
    return (

        <div className={'auth-grid'}>
            <div className={'column'} style={{backgroundColor: '#5D7052'}}>
                <img src={RightImage} alt={'students'} className={'hero-banner-img'} width={'50%'} height={'50%'}/>
            </div>
            <div className={'column'}>
                <div className={'container-title-auth'}>
                    <h1 className={'title-auth'}>A PROPOS DE STUDENTS FOR STUDENTS</h1>
                    <p className={'text-about'}>
                        Students for Students est une application web et mobile mobilisant l'aide entre étudiant.
                        Il est capable, au sein de nos applications, de déposer et/ou consulter les différentes
                        synthèses
                        et prises de note mises à disposition par les étudiants utilisant notre système. De plus,
                        différents
                        salons de discussion sont disponibles pour permettre aux étudiants de poser des questions
                        pouvant aider de nombreuses personnes.
                    </p>
                    <p className={'text-about'}>
                        Students for Students est un projet académique développé par <a
                        href={'https://github.com/khalilkrm'} className={'link-about'}>KARIM Khalil</a> et <a
                        href={'https://github.com/tistaertandrew'} className={'link-about'}>TISTAERT Andrew</a>. HELMo
                        Sainte-Marie. Tout droit réservé. ©
                    </p>
                    <p className={'text-about'}>
                        Les différentes illustrations affichées au sein de cette application web proviennent de
                        l'artiste <a href={'https://www.freepik.com/author/upklyak/26'}
                                     className={'link-about'}>Upklyak</a>. Un tout grand merci à cet artiste.
                    </p>
                </div>
            </div>
        </div>
    )
}