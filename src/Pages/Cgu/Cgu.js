import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from '../../assets/theme'
import {Helmet} from 'react-helmet'
import './cgu.scss';
import ReactGA from "react-ga"

export class Cgu extends Component {
    componentDidMount(){
        ReactGA.pageview(this.props.location.pathname+ this.props.location.search);
        }
        
    render() {

        return (
        <div className="cgu--container">
                    <Helmet>
        <title>AgenZ - Estimation gratuite et en ligne de votre bien immobilier</title>
        <meta
          name="description"
          content="agenz - Estimation en ligne gratuite de biens immobiliers (Appartements, villas et terrains) à Casablanca pour vendre ou acheter en toute confiance - agenz est la référence de l'estimation immobilière en ligne à Casablanca. Grâce à notre technologie inédite et à nos partenariats, nous vous fournissons une première estimation pour votre bien ainsi que des informations sur la dynamique immobilière de votre quartier. L’équipe d’AgenZ vous propose ensuite son expertise et son réseau de qualité pour vous accompagner dans la réussite de vos projets immobiliers, tout en assurant un suivi proactif en tant que tiers de confiance"
        />
        <meta property="og:url"                content='https://www.agenz.ma/Cgu'/>
        <meta property="og:type"               content="article" />
        <meta property="og:title"       content='agenz.ma - CGU'/>
        <meta property="og:description" content='Estimation gratuite et en ligne de biens immobilier au Maroc'/>
        </Helmet>
            <ThemeProvider theme={theme}>
<Typography variant="h2">
Conditions générales d'utilisation du site</Typography>
<Typography variant="body1">
L'accès et l'utilisation du site agenz accessible à l'adresse www.agenz.ma et des Applications mobiles et des services qui y sont proposés sont soumis au respect des présentes conditions générales.
Les conditions contractuelles complémentaires applicables sont librement consultables avant toute souscription ou utilisation des Services.
Les présentes conditions sont en vigueur à compter du 27/10/2020.
</Typography>
<Typography variant="h3">
1. Edition et hébergement du Site
</Typography>
<Typography variant="h4">
1.1. Edition du Site
</Typography>
<Typography variant="body1">
Le Site est édité par la société Agenz SARL, au capital social de 50 000 MAD, immatriculée au Registre du commerce et des sociétés de CASABLANCA sous le numéro 470711, dont le siège social se situe au 46 Boulevard Zerktouni, Casablanca (ci-après dénommée « agenz »).
Directeur de la publication : BELKEZIZ MALIK en qualité de Président
Responsable de la rédaction : BELKEZIZ MALIK
Téléphone : 05 20 69 00 69
Courrier électronique : contact@agenz.ma
</Typography >
<Typography variant="h4">
1.2. Hébergement du Site
</Typography>
<Typography variant="body1">

Le Site est hébergé par la société  Arcanes Technologies (Herbejahiz)
Casablanca Technopark
RDC - Bureau 143bis
Casablanca 20153 MAROC

</Typography>

<Typography variant="h3">
2. Définitions
</Typography>
<Typography variant="body1">
Dans le cadre des présentes, les mots débutant par une majuscule répondent aux définitions suivantes :
« Annonce » : Annonce immobilière de vente ou de location ajoutée sur le Site par les Professionnels de l’immobilier partenaires.


« Biens vendus » : Informations sur les biens immobiliers vendus par le Professionnel de l’immobilier en tant qu’intermédiaire. Un bien est considéré comme bien vendu à partir du moment où le compromis ou la promesse de vente a été signé(e) et le délai de rétractation expiré.
« Partenaire » : Tout Professionnel de l’immobilier partenaire du site.
« Professionnel de l’immobilier » : Agent immobilier, mandataire immobilier ou tout professionnel utilisateur des Services et agréé par Agenz.
« Professionnel de l’immobilier partenaire » : Agent immobilier, mandataire immobilier ou tout professionnel utilisateur des Services à titre gratuit ou onéreux, lié contractuellement avec Agenz.
« Services » : Ensemble des services proposés par agenz.
« Site » : Site internet de agenz accessible à l’adresse https://www.agenz.ma ou à partir d’Applications mobiles éditées par Agenz.
« Utilisateur » : Toute personne naviguant sur le Site ou les Applications mobiles éditées par agenz.
« Vitrine » : Emplacement publié sur le Site qui présente, de façon succincte, l’agence ou l’établissement du Professionnel de l’immobilier.
</Typography>
<Typography variant="h3">
3. Contenus du Site

</Typography >
<Typography variant="h4">
3.1 Contenu du Site et des Services en général
</Typography>
<Typography variant="body1">
Le Site a pour objet de présenter les Services et avantages proposés par Agenz et ses partenaires respectifs dans le cadre des offres de services de Agenz, telles que décrites dans les pages du Site.
Le Site est une plateforme offrant d’une part à l’Utilisateur particulier plusieurs services d’informations immobilières et d’aides à la vente d’immeubles. Le Site permet notamment à l’utilisateur d’estimer sa résidence principale en ligne, d’explorer une carte des prix ou de consulter des annonces d’achats ou locations immobilières. Il permet également la mise en relation des Utilisateurs avec des Professionnels de l’immobiliers notamment en référençant des Professionnels de l’immobilier partenaires.
D’autre part, la rubrique « Espace Pro » du site présentes les outils et fonctionnalités de conseil, d’aide à la décision, ou de gestion patrimoniale proposés aux professionnels de l’immobiliers. Ces fonctionnalités et outils réservés aux professionnels sont accessible depuis un espace professionnels dédié ou via des API. Ils ont été intégralement développés par Agenz et sont la propriété exclusive de la société.
Les Services proposés sur le Site sont susceptibles d’évolution constante. Agenz se réserve le droit d'ajouter, de supprimer ou de modifier tout ou partie des espaces du Site qu'il édite ou des Services qu'il propose, sans préjudice de l'application d'éventuelles conditions antérieurement conclues et sans préavis. Agenz s'efforce de vérifier et valider les informations et données qu'il propose à la consultation sur le Site.
Toutefois, Agenz ne prend aucune obligation quelconque liée à l'exactitude des informations et des données, ou relative aux utilisations qui seraient effectuées desdites informations et données. Agenz n'assure donc aucune garantie, expresse ou tacite, concernant le contenu du Site ou le résultat des estimations.
Notamment, les informations fournies au sujet des Services le sont à titre indicatif uniquement et ne sauraient être considérées comme contractuelles ou comme des offres fermes et définitives de produits ou services, lesdites offres étant soumises à l'acceptation de conditions contractuelles complémentaires.
L’Utilisateur est informé et reconnaît que l’activité du Site se limite à faciliter l’accès à l’information immobilière, les démarches et projets immobiliers, ainsi que la mise en relation des Utilisateurs qui le demandent avec les Professionnels de l’immobilier. La responsabilité du Site ne saurait en aucune manière être engagée dans le cadre des relations, accords, et discussions susceptibles d’intervenir entre les Utilisateurs et les Professionnels de l’immobilier et tout autre partenaire.

</Typography>
<Typography variant="h4">

3.2 Référencement des Agences immobilières sur le Site
</Typography>
<Typography variant="body1">
Agenz effectue une activité de référencement en permettant à l’Utilisateur d’accéder à un échantillon de Professionnels de l’immobilier
Le référencement permet à l’Utilisateur d’accéder à un échantillon de Professionnels de l’immobilier. Ces derniers sont référencés en fonction des critères choisis par l’Utilisateur tels que le dynamisme des Partenaires. Il permet également à l’Utilisateur cherchant un bien d’accéder à un échantillon de biens similaires que des Professionnels de l’immobilier ont vendu et choisi de publier à proximité de l’adresse saisie.
Les Professionnels de l’immobiliers référencés sur le Site sont Partenaires de Agenz. Ils ont souscrit à une offre de visibilité payante leur permettant la création d’une Vitrine sur la plateforme. Dans le but d’obtenir plus de fonctionnalités et/ou d’augmenter les informations affichées, les Professionnels de l’immobilier peuvent choisir des Services adaptés moyennant une rémunération.
Agenz ne détient aucune participation capitalistique des Professionnels de l’immobilier dont la Vitrine et les services sont comparés sur le Site et aucun de ces Partenaires ne détient de participation dans le capital de Agenz
En souscrivant aux différents Services de proposés par Agenz, les Professionnels de l’immobilier acceptent de respecter les Conditions Générales de Vente (CGV) et / ou les Conditions Générales d’Utilisation Pro (CGU Pro). Les Professionnels ne respectant pas les règles applicables peuvent se voir déréférencés par Agenz. Ils n’apparaitront plus sur les différents listings. Le déréférencement peut être provisoire et ne durer que pendant la période de non-conformité aux dispositions établies.

</Typography>
<Typography variant="h4">

3.3 Notification et retrait de contenu illicite
</Typography>

<Typography variant="body1">
Agenz vous informe de la possibilité de notifier une réclamation quant à des éléments ou des contenus du Site.
En conséquence, si vous estimez que des éléments ou contenus du Site sont illicites et/ou contrefont vos droits de propriété intellectuelle ou industrielle, vous devez adresser une notification à Agenz adressée à : Agenz, Service Juridique, 46 Boulevard Zerktouni, Casablanca ou par courriel à contact@agenz.ma contenant tous les éléments justificatifs de titularité des droits le cas échéant. Ensuite, après vérification et si la demande est justifiée, Agenz s'efforcera, dans la mesure raisonnable et dans les meilleurs délais, de retirer le contenu illicite.
Il est précisé que Agenz agit comme intermédiaire dans le cadre de la fourniture de ses services à l’Utilisateur. À ce titre Agenz ne saurait voir sa responsabilité pénale engagée à raison des informations stockées sur le Site sans avoir effectivement connaissance de l'activité ou de l'information illicites ou si, dès sa connaissance de ces faits, les informations litigieuses ont été retirés promptement ou leur accès rendu l'accès impossible.

</Typography>
<Typography variant="h4">
3.4Avertissement
</Typography>

<Typography variant="body1">
    
Agenz a pour but de présenter aux particuliers, sans exhaustivité, diverses informations utiles et divers partenaires pour la vente ou l’acquisition de votre bien immobilier.
Néanmoins, faute de connaître précisément le projet immobilier et faute de pouvoir connaître l’ensemble de nos partenaires, il appartient au particulier de faire toutes vérifications qui lui semblent nécessaires ou opportunes avant de contacter un des Professionnels de l’immobilier référencés sur notre Site.
Agenz ne peut s’engager à garantir les informations publiées sur la Vitrine virtuelle des Professionnels de l’immobilier.
En conséquence, la mise en relation avec un Professionnel de l’immobilier, un promoteur immobilier ou, plus généralement avec tout tiers, par l’intermédiaire de notre Site s’effectue sous votre propre responsabilité sans garantie de notre part quant à la satisfaction des services proposés.


</Typography >
<Typography variant="h3">
4. Accès et sécurité
</Typography>
<Typography variant="body1">
    
La souscription, l'accès ou l'utilisation de certains Services du Site, et notamment des espaces membres, peut nécessiter l'ouverture d'un compte d'Utilisateur impliquant la fourniture d'un identifiant et le choix d'un mot de passe, conforme notamment aux recommandations de la CNDP en la matière
Le mot de passe est personnel et confidentiel. L'Utilisateur en est seul responsable. Il s'engage à ne pas le divulguer à des tiers et à prendre toutes les précautions nécessaires pour éviter que des tiers ne puissent y avoir accès.
L'Utilisateur s'engage à avertir sans délai Agenz en cas de perte ou de vol de son mot de passe.
A défaut, et sauf preuve contraire, toute connexion ou transmission d'ordres ou de données effectuées au moyen du mot de passe sera réputée provenir de l'Utilisateur et sous sa responsabilité exclusive.
L’Utilisateur peut à tout moment demander l’annulation de son compte en adressant un email à contact@agenz.ma
Le présent article s'entend sous réserve des dispositions des éventuelles conditions contractuelles complémentaires, et notamment des règles applicables aux Utilisateurs mineurs.

</Typography >
<Typography variant="h3">
5. Propriété intellectuelle – Parasitisme – interdiction d'utilisation des données – Protection du Site et des bases de données
</Typography>
<Typography variant="body1">
    
Attention : toutes les données et informations présentes ou accessibles gratuitement sur le Site sont destinées aux particuliers, personnes physiques, directement connectés sur le Site pour leur usage strictement personnel. Tout autre usage est interdit et, en particulier, sont prohibés tout usage à caractère professionnel ou commercial et tout usage dépassant les besoins d’un Utilisateur moyen. En conséquence, l’Utilisateur déclare ne pas être un professionnel et ne pas se procurer ou utiliser les données et informations présentes ou accessibles sur le Site pour un usage professionnel, commercial ou d’une façon générale afin d’en tirer un bénéfice. Agenz est et sera particulièrement vigilant, et engagera toutes actions appropriées contre toute reprise quelconque effectuée en violation des droits de propriété intellectuelle et/ou de la loi et /ou des conditions générales du Site.
Si vous souhaitez utiliser dans un autre cadre, et/ou diffuser des données, informations et/ou des services du Site, merci de nous contacter.
Téléphone : 05 20 69 00 69
E-mail : contact@agenz.ma
Les noms, images, logos ou tous autres signes distinctifs présentés sur le Site identifiant Agenz et/ou ses partenaires ou des tiers ou leurs produits et services sont des contenus protégés au titre du droit des marques, du droit des dessins et modèles et/ou du droit d'auteur.
La structure générale, les contenus éditoriaux, images, sons, vidéos ou multimédias, les logiciels et les bases de données utilisés et tous les autres contenus présentés sur le Site sont protégés au titre du droit d'auteur, des droits voisins et/ou du droit sui generis du producteur de base de données, et d'une manière générale, par le droit de la responsabilité civile.
Agenz est seul titulaire des droits de propriété intellectuelle susmentionnés sur l'ensemble des contenus présentés sur le Site.
Toute utilisation des informations, données et des éléments du Site, à quelque titre que ce soit en dehors de la simple consultation directe sur le Site par l'Utilisateur, est strictement interdite, sauf autorisation préalable et par écrit de Agenz. En aucun cas l'accès possible aux informations du Site et à certaines données ne peut permettre à l'Utilisateur de considérer qu'il peut extraire, de manière substantielle ou non, et/ou utiliser en dehors de la consultation du Site, une quelconque donnée du Site ou de tout élément du Site. Il est rappelé en tant que de besoin que de telles extractions et/ou utilisations sont strictement interdites.
Toute reproduction et/ou représentation, totale ou partielle, des signes distinctifs ou contenus présentés sur le Site, y compris les informations et/ou données, sans l'autorisation écrite préalable de Agenz, de ses partenaires ou de tiers, est interdite et constitutive notamment de contrefaçon et susceptible à ce titre d'engager la responsabilité civile et pénale de son auteur.

</Typography>
<Typography variant="h3">
6. Politique de confidentialité
</Typography>
<Typography variant="body1">
Protection des données à caractère personnel

</Typography>



À titre liminaire, il est ici rappelé que les vitrines des Professionnels de l’immobilier, la présentation de leurs équipes le cas échéant, leurs annonces et Biens vendus sont éditées sous leur propre responsabilité.
En application de la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et du Règlement Intérieur de la CNDP, Agenz informe l'Utilisateur de son engagement à respecter la confidentialité, l'intégrité et la sécurité des données que l'Utilisateur sera amené à lui communiquer par le biais du Site.

Toute donnée à caractère personnel vous identifiant directement (notamment vos nom, prénom, coordonnées postales, électroniques, téléphoniques) ou indirectement (notamment vos traces informatiques laissées par votre navigation sur le Site) sont considérées comme des données confidentielles et sont traitées comme telles.

<Typography variant="h4">
6.1. Traitement de données relatives aux Services

</Typography>
<Typography variant="h4">
6.1.1 Traitement
</Typography>

<Typography variant="body1">
La souscription, l'accès et/ou l'utilisation de certains Services impliquent la réalisation d'un traitement de données à caractère personnel, ce que vous acceptez. Le responsable du traitement des données à caractère personnel des Utilisateurs est visé à l’article 1.1. des présentes Conditions Générales d’Utilisation.
Agenz SARL, responsable de traitement dont le siège est situé au 46 Boulevard Zerktouni, Casablanca et visé à l’art 1.1 des présentes, est conscient de la confiance que vous lui accordez en lui confiant vos informations personnelles pour l’utilisation de ses Services. Agenz SARL attache la plus grande importance quant à la confidentialité et la sécurité de celles-ci.
À ce titre, Agenz SARL s’engage à respecter la présente politique de confidentialité que vous acceptez dès lors que vous utilisez ses Services.

</Typography>

<Typography variant="h4">
6.1.2 Nature et finalité des données à caractère personnel

</Typography>
<Typography variant="body1">

En utilisant notre portail ou nos Services, l’Utilisateur est amené à communiquer à Agenz des informations ou des données, dont certaines sont de nature à l’identifier directement ou indirectement.
Les données collectées proviennent de la fourniture volontaire de leurs informations par les Utilisateurs désireux d'accéder ou d'utiliser un Service nécessitant un tel traitement, des traces informatiques laissées par la navigation sur le Site ou de la transmission par l'un des partenaires à l'autre partenaire des données ainsi collectées.
Ces données pourront être utilisées pour les besoins de la gestion des opérations effectuées sur le Site et des actions commerciales de Agenz et /ou de ses partenaires.
Ces données sont également utilisées :
•	Pour la création et la gestion des comptes d’Utilisateurs ;
•	Pour la fourniture des services de Agenz, en particulier liés à l’information sur les prix de l’immobilier et l’évaluation des biens immobiliers, notamment pour l’évaluation des biens ;
•	Pour le suivi de la relation avec les Utilisateurs ;
•	Pour transmettre les demandes de renseignements émises par l’Utilisateur aux Professionnels de l’immobilier présents sur le Site ;
•	Pour permettre la mise en relation de l’Utilisateur avec un Professionnel de l’immobilier présent sur le Site, notamment par l’intermédiaire d’un service d’appel, et de répondre aux mieux au projet immobilier de l’Utilisateur.
Les données à caractère personnel de l’Utilisateur collectées par Agenz peuvent être :
•	Ses prénoms et nom
•	Son adresse de messagerie
•	Son numéro de téléphone
•	Son adresse postale
•	Son adresse Internet Protocol (IP)
•	Son identifiant 
•	Une copie des échanges entre Agenz et l’Utilisateur
•	Des informations relatives à sa navigation, ses projets immobiliers, ses estimations et son activité.
Outils de suivi sur le Site et les Applications
Agenz a recours aux outils suivants :
•	Google analytics : (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) suivi et analyse quantitative et qualitative du trafic ;
Si vous nous contactez par téléphone, les conversations sont susceptibles d’être 
Publicité ciblée, e-mails et SMS
Agenz peut utiliser les données que vous lui fournissez à des fins de prospection commerciale (par exemple pour vous adresser nos newsletters, vous envoyer des invitations à nos événements ou toute autre communication susceptible de vous intéresser et afficher des publicités ciblées sur les réseaux sociaux ou sites tiers).
Agenz peut vous contacter par e-mails, SMS et/ou téléphone afin de vous proposer d’affiner l’estimation en ligne par une évaluation de votre bien immobilier par des Professionnels immobiliers partenaires.
Agenz peut vous contacter afin de procéder au suivi de votre éventuelle mise en relation avec un Professionnel de l’immobilier.

</Typography>
<Typography variant="h4">
6.1.3 Durée de conservation des données
</Typography>
<Typography variant="body1">
Les données à caractère personnel sont effacées ou archivées à l’issue d’une durée de cinq ans après votre dernière utilisation de notre portail ou de nos services.
Ces données pourront également être conservées pour une durée de 10 ans par la suite dans la base archive, sous accès restreint, afin de respecter les obligations légales et réglementaires à la charge de Agenz
</Typography>

<Typography variant="h4">
6.1.4 Destinataires des données

</Typography>

<Typography variant="body1">


Agenz est également susceptible de partager des informations vous concernant, notamment des données à caractère personnel, avec des Professionnels de l’immobilier partenaires de Agenz dans le cadre prévu par la présente politique mais également avec toutes les entités du Groupe.
Agenz ne partage vos données avec les tiers mentionnés au présent article que dans les cas suivants :
•	Lorsque nous faisons appel à un prestataire de services dans le cadre de l’exécution de tout contrat conclu entre vous et nous ou afin de fournir ou améliorer nos services ;
•	Dans le cadre de l’accompagnement de la vente de votre bien immobilier, Agenz est amené, afin de fournir les services demandés, à transmettre aux Professionnels de l’immobilier que vous avez choisies ainsi qu’aux acteurs de votre vente (notaire, diagnostiqueurs, …) un certain nombre de vos données à caractère personnel, telles que vos nom, prénoms, lieu et date de naissance, photographie de votre bien, numéro de téléphone portable ou adresse de messagerie, estimations ;
•	Lorsque vous l’avez expressément accepté, aux partenaires commerciaux de Agenz, pour recevoir des offres promotionnelles de leur part ;
•	Lorsque Agenz a l’obligation légale de le faire ou si Agenz pense de bonne foi que cela est nécessaire pour répondre à toute réclamation à son encontre, se conformer à toute demande judiciaire, ou afin de garantir les droits, les biens et la sécurité de Agenz, ses membres et plus généralement tout tiers.
Les contenus créés par l’Utilisateur sur le Site (tels que les commentaires, Avis et notations) peuvent être communiqués au Professionnel de l’immobilier concerné.
Conformément à la législation applicable, et avec votre consentement lorsqu’il est requis, Agenz peut agréger des données qui vous concernent et que Agenz reçoit ou envoie à ses partenaires commerciaux, notamment tout ou partie de vos données à caractère personnel et les informations collectées par l’intermédiaire de cookies. Ces informations agrégées ne seront utilisées que pour les finalités décrites ci-dessus.

</Typography>
<Typography variant="h4">
6.2 Droits de l’Utilisateur
</Typography>
<Typography variant="body1">

Vous bénéficiez :
•	d’un droit d’accès : droit de recevoir une copie de vos données à caractère personnel en notre possession ;
•	d’un droit à l’effacement ou droit à l’oubli : droit à l’effacement de vos données à caractère personnel en possession de Agenz (sauf  lorsque la loi lui impose de conserver ces données ou lorsque Agenz a un motif légitime de le faire)
•	d’un droit à la rectification : droit de modifier les données à caractère personnel en la possession de Agenz qui vous concernent qui sont erronées ou obsolètes
•	d’un droit d’opposition : vous pouvez vous opposer à tout moment pour des raisons tenant à votre situation particulière, au traitement de vos données à caractère personnel à des fins de marketing direct sauf motifs légitimes et impérieux pour le traitement qui prévalent sur les intérêts et les droits et libertés de la personne concernée, ou pour la constatation, l'exercice ou la défense de droits en justice ;
•	d’un droit à la limitation : vous avez le droit de limiter les traitements effectués sur vos données à caractère personnel dans les cas suivants :
o	si vous exercez votre droit de rectification, la limitation de traitement peut être exigé pendant la durée permettant à Agenz d’en vérifier l’exactitude ;
o	si vous exercez votre droit d’opposition, pendant la durée de vérification portant sur le point de savoir si les motifs légitimes que Agenz poursuit prévalent les vôtres ;
o	lors d’un traitement illicite de vos données à caractère personnel, vous pouvez exiger une limitation de leur utilisation plutôt qu’un effacement ;
o	pour des données à caractère personnel aux fins du traitement devant être effacées, mais qui sont encore nécessaires pour la constatation, l’exercice ou la défense de droits en justice.
•	d’un droit à la portabilité : vous avez le droit de recevoir les données à caractère personnel que vous avez fournies à Agenz ou qui ont été générées par votre activité ou qui ont été observées. Celles-ci doivent être communiquées dans un format structuré, couramment utilisé et lisible par la machine. Ce droit comprend également le droit de transmettre ces données à un autre responsable du traitement.
Enfin, vous disposez du droit de définir des directives relatives au sort de vos données à caractère personnel après votre mort.
L’Utilisateur peut exercer ces droits en contactant Agenz à cette adresse contact@agenz.ma en joignant un justificatif d’identité et en mentionnant ses prénoms, nom et adresse de courrier électronique.
En cas de différend entre Agenz et l’Utilisateur concernant le traitement des données, l’Utilisateur pourra adresser sa réclamation à Agenz.
À cet effet, l’Utilisateur pourra contacter le Délégué à la protection des données de la société, vous pouvez lui écrire par courrier électronique à contact@agenz.ma.
Si aucune solution satisfaisante pour l’Utilisateur n’est trouvée par la société ou si le différend persiste, l’Utilisateur aura la possibilité d’introduire une réclamation auprès de la CNDP.
Contact
Pour toute question relative à la présente politique de confidentialité ou pour toute demande relative à vos données à caractère personnel, vous pouvez nous contacter en :
•	adressant un email à notre délégué à la protection des données à l’adresse contact@agenz.ma
•	ou en nous adressant un courrier à l’adresse suivante : Agenz, Délégué à la protection des données, 46 Boulevard Zertkouni, Casablanca, Maroc.
</Typography>
<Typography variant="h4">

6.3 Traitements de données techniques - Cookies

</Typography>
<Typography variant="body1">

Agenz et/ou ses partenaires procèdent en outre à l'enregistrement automatique de certaines données techniques.
Lors de la consultation du Site, les données techniques susceptibles d'être enregistrées, au titre de l'accès ou de l'utilisation du Site sont l'adresse Internet Protocol (IP) de l'Utilisateur et les informations relatives à la configuration (type de machine, de navigateur, etc.) et à la navigation (date, heure, pages consultées, survenance d'erreurs, etc.) de l'Utilisateur.
Ces dernières informations peuvent être stockées, par l’intermédiaire de votre logiciel de navigation, dans de courts fichiers textuels (cookies), sous réserve de vos choix, dans un espace dédié du disque Agenz et/ou ses partenaires traitent ces données techniques de façon totalement anonyme, ne les rattachant à aucune information permettant d'identifier l'Utilisateur et, ne les transmettent pas à des tiers.
A chaque cookie est attribué un identifiant anonyme. Le fichier cookie permet à son émetteur d'identifier le terminal dans lequel il est enregistré pendant la durée de validité ou d'enregistrement du cookie concerné.
Les cookies, en fonction de leur catégorie, sont utilisés pour les finalités suivantes :
Une première catégorie de cookies sont ceux strictement nécessaires à l’utilisation du Site. Ils sont indispensables pour naviguer sur le Site en profitant de toutes ses fonctionnalités (prise en charge du système d’exploitation de l’internaute, affichage...). Ils permettent d’adapter certaines fonctionnalités et la présentation du Site à votre navigateur et à votre matériel. Ce sont des cookies essentiellement techniques qui ne vous identifient pas comme un individu.
Une autre catégorie de cookies concerne ceux qui permettent de mesurer la performance. Ces cookies permettent d'établir des statistiques et volumes de fréquentation et d'utilisation des divers services du Site. Ils ont pour objet de permettre à Agenz d’améliorer le confort des Utilisateurs. Ces cookies ne vous identifient pas comme un individu.
Ces deux premières catégories de cookies ne sont utilisées qu'à des fins d'établissement de statistiques d'utilisation, de prévention des erreurs, de prévention des atteintes et de la contrefaçon du Site ou d'amélioration des conditions d'accès ou d'utilisation du Site.
Une troisième catégorie de cookies concerne la fonctionnalité. Ils vont permettre de simplifier votre navigation. En effet, ils permettent d’enregistrer certains de vos choix (langue, nom de l’Utilisateur, pays, informations relatives à un formulaire saisi précédemment, ...).
Certains cookies de mesure d’audience vont permettent à Agenz de mesurer les visites de certains espaces dédiés à ses partenaires et d’analyser ces visites, à savoir :
•	Google Analytics : (Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) afin d’analyser le trafic et les actions effectuées sur le Site ;
•	Facebook : (Facebook Ireland Limited 4 Grand Canal Square, Grand Canal Harbour Dublin 2, Ireland) afin d’analyser le trafic et les actions effectuées sur le Site ;
•	LinkedIn : (LinkedIn Ireland Unlimited Company Gardner House, Wilton Plaza, Dublin 2, Ireland  ) afin d’analyser le trafic et les actions effectuées sur le Site ;
•	Realytics : (Realytics, 73 rue d’Anjou, 75008 Paris), le cookie analytique Realytics est un cookie de mesure d’audience et statistiques, de ce fait exempt de consentement, selon la CNIL, utilisé pour mesurer la performance des campagnes TV des annonceurs sur le digital. En plus de la mesure, Realytics offre des solutions d’optimisation ou de mesure d’audience avancée qui peuvent nécessiter de recueillir un consentement libre, explicite et non équivoque de l’Utilisateur. Realytics devient alors un fournisseur de données pour les partenaires de l’annonceur, qui doit s'assurer de la conformité du partenaire opérant. Dans les 2 cas, le cookie Realytics s’engage à respecter les données collectées et à ne collecter aucune donnée personnelle ou sensible et peut être désactivé depuis la page opt-out de Realytics.
•	Shieldsquare : (Shieldsquare, Shree Arcade, #1391/16/1, 3rd Floor, 19th Main Road, HSR Layout, Sector 4, Bangalore 560102, Karnataka, INDIA) outil de pare-feu.
Une autre catégorie de cookie permet l’identification des Utilisateurs par l’intermédiaire de la solution « Lead The Way » de CARTEGIE. Si vous souhaitez exercer votre droit d’opposition à votre identification par la société CARTEGIE, vous pouvez lui adresser un courrier à l’adresse suivante : 3 rue Christian Franceries, Parc Chavailles 2, BP 80011, 33522 BRUGES Cedex.
Une dernière catégorie de cookies provient de réseaux sociaux : ces cookies, émanant de tiers, permettent à l’Utilisateur de partager le contenu du Site avec d’autres personnes. C’est le cas par exemple des boutons applicatifs "Partager" ou "J'aime", provenant de réseaux sociaux comme "Facebook "Twitter", LinkedIn").
Nous attirons votre attention sur l’identification que permet un tel bouton. En effet, le réseau social qui fournit ce type de boutons applicatifs est susceptible de vous identifier grâce à ce bouton, même si vous n'avez pas cliqué dessus lors de votre consultation du Site. En effet, certains cookies permettent au réseau social concerné de suivre votre navigation sur le Site, dès lors que votre compte à ce réseau social est activé sur votre terminal durant votre navigation sur le Site.
Agenz n’a aucun contrôle sur le processus employé par les réseaux sociaux pour collecter des informations relatives à votre navigation sur le Site.
Nous vous conseillons donc de vous déconnecter de ces réseaux sociaux avant de naviguer sur le Site ou ses Applications, si vous ne voulez pas que de publications par les réseaux sociaux de vos actions issues de ces boutons.
Agenz vous invite également à consulter les politiques de protection des données à caractère personnel de ces réseaux sociaux. Celles-ci doivent vous permettre d'exercer certains choix de confidentialité auprès de ces réseaux sociaux, notamment en paramétrant vos comptes d'utilisation de chacun de ces réseaux.
Enfin, une dernière catégorie de cookies concerne la publicité. Ce sont les cookies de publicité ciblée.
Ces cookies permettent de proposer à l’Utilisateur un contenu publicitaire ciblé au regard de ses centres d’intérêts. Ces cookies sont déposés par les partenaires de Agenz
Agenz ne gère pas les cookies de ses partenaires et n'a aucun contrôle sur ces cookies.
Attention : Agenz peut vous proposer sur le Site des publicités ou des liens renvoyant vers des sites tiers qui pourraient collecter vos données à caractère personnel lorsque vous cliquez sur les liens concernés. Les présentes Conditions Générales d’Utilisation ne concernent pas la visite des sites internet de tiers, Agenz ne peut être tenu responsable de leur politique en matière de données à caractère personnel ainsi que de l’utilisation de celles-ci.
Sans préjudice de ce qui précède, Agenz et/ou ses partenaires peuvent être toutefois amenés à utiliser ces informations en coopération avec le fournisseur d'accès à Internet de l'Utilisateur pour identifier l'Utilisateur aux fins de faire exécuter tout ou partie des présentes conditions générales ou conditions contractuelles complémentaires ou sur demande des autorités administratives ou judiciaires compétentes.
Comment exercer vos droits ?
Nous vous informons que vous pouvez à tout moment paramétrer les cookies en cliquant ici ou paramétrer votre navigateur afin de modifier vos choix en matière de cookies. Le paramétrage du navigateur internet est un moyen efficace et gratuit permettant déterminer, en amont, la gestion des cookies. Vous pouvez ainsi décider :
•	d’accepter l’enregistrement de tous les cookies intégrés dans les pages et contenus que vous consultez. Notez que d’une part, ces cookies ne seront lisibles que leurs émetteurs. D’autre part, ce procédé n’est pas définitif, et il vous sera toujours possible, a posteriori, de supprimer ces cookies ;
•	de refuser l’enregistrement des cookies sur votre terminal. Dans ce cas, votre visite du Site ne sera plus comptabilisée dans les outils de mesure de la fréquentation mais vous ne pourrez plus bénéficier du même confort de navigation, certaines fonctionnalités nécessitant l’utilisation de cookies. Par conséquent, Agenz décline toute responsabilité pour les éventuels désagréments liés aux possibles dysfonctionnements de nos services résultant de l'impossibilité de consulter les cookies nécessaires ;
•	d’être invité par votre navigateur à donner votre accord ou votre refus avant l’installation d’un nouveau cookie sur votre terminal.
Le délai de validité du consentement au dépôt des cookies est de 13 mois. A l’expiration de ce délai, le consentement de l’Utilisateur est à nouveau recueilli.
Le paramétrage en matière de gestion des cookies dépend de votre navigateur (plus d’informations, sur https://www.youronlinechoices.com/fr/controler-ses-cookies/ et https://www.allaboutcookies.org/fr/).
A titre indicatif, vous vous opposez à l'enregistrement de cookies en configurant votre navigateur de la manière suivante :
•	Pour Internet Explorer:
1.	Allez dans Outils - Options Internet.
2.	Cliquez sur l'onglet confidentialité.
3.	Cliquez sur le bouton avancé, cochez la case "Ignorer la gestion automatique des cookies".

En savoir plus : https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies


•	Pour Firefox:
1.	En haut de la fenêtre de Firefox, cliquez sur le bouton Firefox (menu Outils sous Windows XP), puis sélectionnez Options.
2.	Sélectionnez le panneau Vie privée.
3.	Paramétrez Règles de conservation : à utiliser les paramètres personnalisés pour l'historique.
4.	Décochez Accepter les cookies.

En savoir plus : https://support.mozilla.org/fr/kb/activer-desactiver-cookies?redirectlocale=fr&redirectslug=Activer+et+d%C3%A9sactiver+les+cookies


•	Pour Chrome:
1.	Cliquez sur l'icône représentant une clé à molette qui est située dans la barre d'outils du navigateur.
2.	Sélectionnez Paramètres.
3.	Cliquez sur Afficher les paramètres avancés.
4.	Dans la section "Confidentialité", cliquez sur le bouton Paramètres de contenu.
5.	Dans la section "cookies", vous pouvez bloquer les cookies et données de sites tiers

En savoir plus : https://support.google.com/chrome/bin/answer.py?hl=fr&hlrm=en&answer=95647


•	Pour Safari:
1.	Allez dans Réglages - Préférences
2.	Cliquez sur l'onglet Confidentialité
3.	Dans la zone "Bloquer les cookies", cochez la case "toujours"

En savoir plus : https://support.apple.com/kb/HT1677?viewlocale=fr_FR


•	Pour Opéra:
1.	Allez dans Réglages - Préférences
2.	Cliquez sur l'onglet avancées
3.	Dans la zone "cookies", cochez la case "Ne jamais accepter les cookies"

En savoir plus : https://help.opera.com/Windows/10.20/fr/cookies.html
</Typography>

<Typography variant="h4">
6.5. Carte des Biens vendus : Traitement des données issues de l’administration fiscale relatives aux Biens vendus

</Typography>

<Typography variant="body1">

Le traitement de données relatives à la carte des Biens vendus implique la réalisation d'un traitement de données à caractère personnel. Le responsable du traitement des données à caractère personnel des Utilisateurs est visé à l’article 1.1. des présentes Conditions Générales d’Utilisation.
Information individuelle des personnes
Les données relatives aux mutations proviennent d’informations que l’administration fiscale met gratuitement à disposition du public au titre de la loi 31-13 relative au libre accès du public à l’information
Ces données sont relatives aux ventes, adjudications, expropriations et aux échanges de biens immobiliers publiés au fichier immobilier au cours des cinq dernières années, issues des traitements informatisés relatifs à la publicité foncière et à la documentation littérale du cadastre.
Pour chaque mutation, les éléments d'information mis à disposition sont les suivants :
1.	Date et nature de la mutation ;
2.	Prix ;
3.	Adresse : numéro de voie, indice de répétition, type, code et libellé de la voie, code postal et libellé de la commune ;
4.	Références cadastrales : code de la commune et du département, préfixe et code de la section cadastrale, numéro de plan du lieu de situation des biens, le numéro de volume ainsi que, si le bien objet de la mutation fait partie d'une copropriété, le nombre de lots et le numéro de lot dans la limite de cinq lots par mutation ;
5.	Descriptif du bien dès lors qu'il a été déclaré à l'administration : surface fournie au code type de local, type de local, nombre de pièces principales, surface du terrain, et, pour les terrains non bâtis.
Ces informations peuvent concerner tant des vendeurs (ou cédants) que des acquéreurs (ou cessionnaires). Agenz ne diffuse que les données relatives aux ventes (désignées pour le présent article par « Biens vendus »).
Fondement légal et finalité
Ce traitement est justifié par un intérêt légitime tenant au développement de la transparence des marchés fonciers et immobiliers par la fourniture d’un service facilitant l’accès à la connaissance des prix immobiliers par toute personnes intéressées.
Durée de conservation des données
Les données à caractère personnelles ne sont pas récoltées ou sont effacées automatiquement.
Les données pourront être conservées pour une durée de 10 ans supplémentaire par la suite dans la base archive, sous accès restreint, dans une finalité de statistique et de recherche sur les prix.
Destinataires des données
Ces données sont diffusées au public par l’intermédiaire de notre Site, y compris nos Applications.
Néanmoins, des mesures sont prises afin de ne pas permettre la ré identification des personnes concernées, ni une indexation sur les moteurs de recherche externes en ligne.
Nous pouvons partager ces données personnelles avec d'autres parties, tels que des agences immobilières, des mandataires immobiliers, des clients, des sites affiliés ou des applications et des prestataires de services avec qui nous avons contracté.
Nous demandons à tous ces tiers de respecter la sécurité de vos données à caractère personnel et de les traiter conformément à la loi. Nous n'autorisons pas nos prestataires tiers à utiliser vos données personnelles à leurs propres fins et nous ne leur permettons de traiter vos données personnelles qu'à des fins spécifiques et conformément à nos instructions.
Droits des personnes concernées
Toute personne concernée par la mutation publiée sur le Site bénéficie :
•	d’un droit d’accès : droit de recevoir une copie de ses données à caractère personnel en notre possession ;
•	d’un droit à l’effacement ou droit à l’oubli : droit à l’effacement de ses données à caractère personnel en possession de Agenz (sauf lorsque la loi lui impose de conserver ces données ou lorsque Agenz a un motif légitime de le faire)
•	d’un droit à la rectification : droit de modifier les données à caractère personnel en la possession de Agenz qui la concernent qui sont erronées ou obsolètes
•	d’un droit d’opposition : vous pouvez opposer à tout moment pour des raisons tenant à votre situation particulière, au traitement de vos données à caractère personnel à des fins de marketing direct sauf motifs légitimes et impérieux pour le traitement qui prévalent sur les intérêts et les droits et libertés de la personne concernée, ou pour la constatation, l'exercice ou la défense de droits en justice ;
•	d’un droit à la limitation : droit de limiter les traitements effectués sur ses données à caractère personnel dans les cas suivants :
o	en cas d’exercice du droit de rectification, la limitation de traitement peut être exigé pendant la durée permettant à Agenz d’en vérifier l’exactitude ;
o	en cas d’exercice du droit d’opposition, pendant la durée de vérification portant sur le point de savoir si les motifs légitimes que Agenz poursuit prévalent ceux de la personne concernée ;
o	lors d’un traitement illicite de ses données à caractère personnel, la personne concernée peut exiger une limitation de leur utilisation plutôt qu’un effacement ;
o	pour des données à caractère personnel aux fins du traitement devant être effacées, mais qui sont encore nécessaires pour la constatation, l’exercice ou la défense de droits en justice.
Exercice des droits par les personnes concernées
Le droit d’opposition à la publication des données sur un bien ainsi que le droit à l’effacement des données sur un bien s’effectuent sur l’espace sécurisé prévu à cet effet accessible par le bouton « Signaler un problème » sous la description du bien vendu et permettant de télécharger un justificatif d'identité et tout document reliant juridiquement la personne concernée avec le bien concerné (acte de vente, jugement d'adjudication, ...) pour exercer ses droits.
Dans l’hypothèse où l’Utilisateur exerce son droit d’opposition, il pourra demander la suppression de toutes les données le concernant de la base de données de Agenz par retour de mail confirmant la prise en compte du droit d’opposition.
L’exercice des autres droits s’effectue en contactant Agenz à cette adresse : contact@agenz.ma. A cet effet il pourra vous être demandé de produire un justificatif d’identité et tout document reliant juridiquement la personne concernée avec le bien concerné (acte de vente, jugement d’adjudication, …).
Le cas échéant, la personne concernée prendra soin de masquer sur les documents transmis toute information superflue : doivent seulement apparaître les nom, prénom, adresse du bien ainsi que la nature juridique et la date de l'acte.
En cas de différend entre Agenz et la personne concernée concernant le traitement des données, l’Utilisateur pourra adresser sa réclamation à Agenz conformément à l’art. 6.3 des présentes.

</Typography>

<Typography variant="h3">
7. Liens hypertextes

</Typography>

<Typography variant="body1">
Le Site peut contenir des liens hypertextes vers des contenus émanant de tiers ou vers des sites Internet exploités par des tiers.
Agenz n'est pas responsable de la qualité ou de l'exactitude de ces contenus ni de ces sites Internet et ne peuvent pas non plus être considérés comme approuvant, publiant ou autorisant ces sites Internet ou ces contenus.
Par conséquent, les exploitants de ces sites sont seuls responsables du respect des législations et réglementations applicables, notamment aux produits et services qu'ils mettent en vente sur leur site, et plus particulièrement en matière de protection du consommateur, de vente à distance, réglementation des prix, protection des données personnelles, etc.
Agenz décline toute responsabilité quant aux dommages pouvant résulter de l'utilisation de ces sites.
La création de liens hypertextes vers le présent Site ne peut se faire sans l'autorisation expresse et préalable de Agenz.

</Typography>

<Typography variant="h3">
8. Responsabilités
</Typography>

<Typography variant="body1">
Agenz fait ses meilleurs efforts pour s'assurer du bon fonctionnement du Site et des Services y figurant, selon les limites de responsabilité des présentes Conditions générales.
</Typography>


<Typography variant="h4">
8.1. Responsabilité des partenaires
</Typography>


<Typography variant="body1">
    
Les Services présentés par les Partenaires, le sont sous la seule responsabilité de ceux-ci.
En conséquence de quoi Agenz est dégagé de toute responsabilité du fait des contenus édités et/ou des services proposés par les partenaires par l'intermédiaire du présent Site.

</Typography>

<Typography variant="h4">
8.2. Limitations de responsabilité

</Typography>

<Typography variant="body1">
 
Compte tenu notamment des aléas techniques liés au fonctionnement décentralisé du réseau Internet, Agenz ne fournit aucune garantie de continuité de service ou d'absence d'erreurs du Site.
Agenz se réserve à cet égard le droit de suspendre l'accès au Site en tout ou partie pour procéder sans préavis à toute opération de correction, de mise à jour ou de maintenance.
Agenz ne peut en aucun cas être tenu responsable de tout préjudice et/ou perte qui en résulterait pour l'Utilisateur.
Agenz ne pourra, en tout état de cause, pas voir sa responsabilité engagée pour les dommages indirects et notamment tout préjudice commercial, moral et financier en ce compris toute perte de bénéfices ayant pour cause, origine, ou fondement, l'utilisation du Site.
   
</Typography>
<Typography variant="h3">
9. Loi applicable

</Typography>

<Typography variant="body1">
Le Site et les présentes Conditions générales sont soumis à la loi Marocaine
 
</Typography>

<Typography variant="h3">
10. Informations légales

</Typography>

<Typography variant="body1">
 
Agenz® est une marque déposée et exploitée par la société Agenz SARL
Siège social : 46 Boulevard Zerktouni, Casablanca
SAS au capital de 50 000 MAD – RC : 470711
Contact : contact @agenz.ma
</Typography>
            </ThemeProvider>          
            </div>
            
        )
    }
}

export default Cgu
