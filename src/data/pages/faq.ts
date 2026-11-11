import type { LivePage } from "@/data/pages/types";
import { faqPageLd } from "@/data/faq";

const items = [
  {
    "q": "Qu'est-ce que Eugenia School ?",
    "a": "Eugenia School fait partie du groupe Albert School ayant pour mission de donner une instruction rigoureuse en business et en data. Elle propose un Bachelor et un Master of Science qui se fait en alternance. Soutenue et financée par de nombreux entrepreneurs de renom, Eugenia School vise à former les talents dont l'économie de demain a besoin : des profils hybrides dans le domaine du business et des données."
  },
  {
    "q": "Quelle est la différence entre Eugenia et Albert School ?",
    "a": "Les deux écoles ont été fondées par les mêmes fondateurs, Grégoire Genest et Mathieu Schimpl, serial entrepreneurs. Albert School s'appuie sur les maths appliquées et une approche quantitative : une IA et une data très techniques (data science, engineering) appliquées au business. Eugenia forme des profils plus opérationnels, entrepreneuriaux et généralistes, des « couteaux suisses » de l'IA appliquée au business, sans maths avancées."
  },
  {
    "q": "Pourquoi choisir Eugenia School ?",
    "a": "Les entreprises qui réussissent aujourd'hui partagent une approche centrée sur les données, souvent décrite comme « data driven ». Cette approche n'est possible qu'avec des équipes maîtrisant le langage des données à tous les niveaux et dans toutes les fonctions de l'entreprise. L'apprentissage des données permet aux étudiants de comprendre comment créer de la valeur dans un monde transformé par la technologie."
  },
  {
    "q": "En quoi la pédagogie d'Eugenia School est-elle innovante ?",
    "a": "La pédagogie innovante d'Eugenia School, centrée sur les données, intègre l'enseignement académique à l'expérience du monde réel, comme en témoignent les BDD en collaboration avec notre réseau entrepreneurial avec Station F ou nos entreprises partenaires telles que Mistral AI, Microsoft ou encore Snapchat. Découvrez la page dédiée à l'explication en détails de notre méthode d'enseignement."
  },
  {
    "q": "Que sont les Business Deep Dives (BDD) ?",
    "a": "Les « Business Deep Dives » sont la signature éducative du groupe Albert School et donc d'Eugenia School. Il s'agit de cas pratiques de 3 à 4 semaines en collaboration avec une entreprise de premier plan, permettant aux étudiants de mettre en pratique ce qu'ils étudient avec des données réelles dans des situations réelles. À la fin de chaque BDD, les étudiants présentent leur travail aux dirigeants de l'entreprise partenaire, et une équipe gagnante est désignée."
  },
  {
    "q": "Quelle est la différence entre BDD et Géniathon ?",
    "a": "Les BDD sont les Business Deep Dives, des cas sur lesquels nos étudiants de Bachelor travaillent. Les Géniathons sont les hackathons d'Eugenia et dédiés aux étudiants du Master of Science."
  },
  {
    "q": "Quels sont les points communs entre les élèves d'Eugenia School ?",
    "a": "Les élèves d'Eugenia School ont en commun l'ambition, l'esprit entrepreneurial, un intérêt marqué pour le monde du business et la conscience que les données joueront un rôle crucial dans leur future profession."
  },
  {
    "q": "Est-ce que les diplômes d'Eugenia School sont reconnus par l'État ?",
    "a": "Nos diplômes s'appuient sur des titres RNCP (Registre National des Certifications Professionnelles) reconnus par France Compétences. Pour le Bachelor AI Applied to Business, il s'agit du titre RNCP de niveau 6 « Concepteur de solutions no code », délivré par LION (RNCP 41143). Pour le Master of Science AI Applied to Business, il s'agit du titre RNCP de niveau 7 « Architecte en intelligence artificielle », délivré par JEDHA (RNCP 41993)."
  },
  {
    "q": "Quelles perspectives de carrières pour les diplômés d'Eugenia School ?",
    "a": "Les profils hybrides Business et Data développés à Eugenia School répondent à une forte demande des entreprises. Le programme facilite une progression de carrière rapide, préparant les diplômés à une variété de postes à responsabilité tels que Data Analyst, Project Manager, Product Owner, Growth Hacker, et plus encore."
  },
  {
    "q": "Qui sont nos professeurs ?",
    "a": "Les enseignants d'Eugenia School sont des professionnels avec une expérience significative dans leurs secteurs de prédilection. La plupart d'entre eux occupent des postes de décision dans le monde professionnel, ce qui leur permet de dispenser un enseignement étroitement aligné sur les réalités de l'industrie."
  },
  {
    "q": "Y a-t-il des mentors et un suivi individuel ?",
    "a": "Oui, pour le Bachelor comme pour le MSc : chaque étudiant est accompagné par des mentors et bénéficie d'un suivi individuel tout au long du parcours."
  },
  {
    "q": "Puis-je visiter l'école ou obtenir une visite individuelle du campus ?",
    "a": "Tout au long de l'année, nous proposons de nombreux événements sur nos campus, tels que des journées portes ouvertes et des journées d'immersion. Les candidats admissibles peuvent également organiser une visite personnalisée du campus en écrivant à admission@eugeniaschool.com."
  },
  {
    "q": "Quelles sont les informations partagées sur le programme français Inserjeunes ?",
    "a": "Vous pouvez obtenir des informations sur le programme français Inserjeunes en cliquant sur le lien suivant : https://www.inserjeunes.education.gouv.fr/diffusion/accueil"
  },
  {
    "q": "Quel est le nombre maximum d'élèves par classe ?",
    "a": "Le nombre maximum d'élèves par classe est de 40."
  },
  {
    "q": "La présence est-elle obligatoire ?",
    "a": "Oui, les cours se font en présentiel."
  },
  {
    "q": "Des ordinateurs sont-ils mis à disposition ?",
    "a": "Les étudiants doivent disposer d’un ordinateur fonctionnel, en particulier pour les cours de data."
  },
  {
    "q": "Quels types de postes sont offerts en apprentissage ?",
    "a": "Nous vous invitons à visiter la page dédiée du programme Master of Science avec les exemples de postes que nos étudiants occupent."
  },
  {
    "q": "Comment recruter un stagiaire, un alternant ou un diplômé ?",
    "a": "Décrivez votre besoin via le formulaire dédié : l'équipe revient vers vous. Stage, alternance (contrats de professionnalisation et d'apprentissage acceptés) ou CDI pour un diplômé."
  },
  {
    "q": "Eugenia School offre-t-elle un soutien à la rédaction de CV et à la recherche d'entretiens ?",
    "a": "Oui, Eugenia School offre un soutien personnalisé, y compris un programme de coaching et des rencontres avec des entreprises partenaires."
  },
  {
    "q": "Qu'est-ce que le rythme d'alternance ?",
    "a": "Le MSc se fait en alternance : après un bootcamp de 5 semaines, le rythme est de 4 jours en entreprise et 1 jour à l'école. La 3e année du Bachelor peut aussi se faire en alternance."
  },
  {
    "q": "Quels types de contrats sont acceptés pour l'alternance : professionnalisation ou apprentissage ?",
    "a": "Les contrats de professionnalisation et d'apprentissage sont acceptés."
  },
  {
    "q": "Quand puis-je effectuer un stage pendant mon bachelor ?",
    "a": "Il y a deux périodes de stage : la première de minimum 6 semaines, pendant l'été entre la 1ère et la 2ème année. La deuxième, de six mois au début de la troisième année."
  },
  {
    "q": "Eugenia School propose-t-elle un coaching pour des compétences telles que la gestion d'équipe ou la négociation ?",
    "a": "Oui, Eugenia School offre un coaching constant par le biais de diverses activités, notamment deux semaines de pré-rentrée avec en trame une activité de pitch à réaliser à la manière de QVEMA, des cours pratiques de business et des Business Deep Dives."
  },
  {
    "q": "Y a-t-il des projets de groupe ?",
    "a": "Oui, les projets personnels et les projets de groupe sont des éléments cruciaux à Eugenia School. Le travail en groupe est mis en avant lors des Business Deep Dives et des Géniathons, généralement en équipes de 3 à 6 personnes."
  },
  {
    "q": "Combien de temps faut-il consacrer aux devoirs ?",
    "a": "La charge de travail varie en fonction de la semaine, du rythme de travail et de l'organisation. Il faut s'attendre à consacrer environ 10 à 15 heures par semaine au travail personnel et de groupe. Certains contenus ou lectures devront être revus avant d'assister aux cours."
  },
  {
    "q": "En quelle langue parlent les professeurs ?",
    "a": "La consigne donnée est de parler en français. En revanche, un certain niveau d'anglais est demandé : les supports de cours sont en anglais et les outils data sont, pour la plupart, aussi en anglais."
  },
  {
    "q": "Puis-je intégrer une autre école de commerce après avoir obtenu un bachelor d'Eugenia School ?",
    "a": "Le diplôme de bachelor d'Eugenia School est reconnu et vous permet de postuler à des masters à Eugenia School ou dans toute autre université qui exige un diplôme de bachelor pour l'admission."
  },
  {
    "q": "Y a-t-il une vie associative à Eugenia School ?",
    "a": "Oui ! Les associations sont mixtes entre Eugenia et Albert School. Un BDE, une Junior Entreprise, une association de running et tant d'autres existent déjà mais nous favorisons la création de nouvelles associations tous les ans."
  },
  {
    "q": "Quelle est la date limite pour accepter mon admission ?",
    "a": "Félicitations ! Le choix de votre école est l'une des décisions les plus importantes de votre vie. Il n'y a pas de délai pour accepter l'offre. Votre place est réservée pendant 10 jours après la notification d'admission. Ensuite, votre inscription sera acceptée en fonction des places disponibles."
  },
  {
    "q": "Quand recevrai-je mes résultats d'admission ?",
    "a": "Les résultats sont fournis dans un délai de 10 jours après chaque étape du processus de sélection."
  },
  {
    "q": "En quoi consiste le processus de sélection ?",
    "a": "Consultez la page dédiée pour en savoir plus."
  },
  {
    "q": "Quelles sont les conditions requises pour intégrer Eugenia School ?",
    "a": "Eugenia School est ouvert aux lycéens de terminale générale ou technologique avec un intérêt pour les nouvelles technologies. L'ADN entrepreneurial est un plus. Pour les masters, il faut être titulaire d'un bac+3, soit 180 crédits ECTS, avec l'envie d'avoir une formation technique. Le bootcamp de M1 reprend les bases de l'analyse de données."
  },
  {
    "q": "Puis-je rejoindre Eugenia School après une autre filière ?",
    "a": "Oui. Pour le MSc, il faut être titulaire d'un bac+3 (180 crédits ECTS), quelle que soit la filière d'origine, avec l'envie d'acquérir une base technique : le bootcamp de démarrage reprend les bases de l'analyse de données."
  },
  {
    "q": "Quand et comment puis-je poser ma candidature ?",
    "a": "Consultez notre page concernant le processus de candidature pour obtenir les informations nécessaires pour postuler à chacun de nos programmes."
  },
  {
    "q": "Combien coûte la candidature ?",
    "a": "La candidature est gratuite pour les candidats résidant dans l'Union européenne. Pour les candidats résidant hors de l'Union européenne, elle coûte 30 €."
  },
  {
    "q": "Quand a lieu la rentrée ?",
    "a": "La rentrée a lieu uniquement en septembre. Il n'y a pas de rentrée en janvier."
  },
  {
    "q": "Faut-il s'inscrire sur Parcoursup ou Mon Master ?",
    "a": "Non, Eugenia School n'est pas répertoriée sur Parcoursup ou Mon Master. Les candidatures se font directement sur cette page."
  },
  {
    "q": "Une lettre de motivation est-elle nécessaire pour postuler ?",
    "a": "Il est recommandé d’inclure tous les documents pertinents dans votre candidature, tels que les relevés de notes, les certificats linguistiques, les diplômes et les lettres de recommandation."
  },
  {
    "q": "Sur quoi porte l'entretien de motivation ?",
    "a": "L'entretien se compose de trois parties : faire connaissance, un casse-tête logique et une explication de vos motivations."
  },
  {
    "q": "Que dois-je faire si je ne peux pas compléter ma candidature parce qu'il me manque des relevés de notes ?",
    "a": "Téléchargez deux fois le même document si vos relevés de notes sont semestriels et non trimestriels. Le jury comprendra."
  },
  {
    "q": "Puis-je soumettre ma candidature si je n'ai pas encore mes notes de l'année en cours ?",
    "a": "Oui, vous pouvez entamer la procédure d'admission et soumettre les notes manquantes plus tard."
  },
  {
    "q": "Existe-t-il des logements sur le campus ?",
    "a": "Non, mais des solutions sont mises en place pour trouver chaussures à votre pied, contactez-nous pour avoir toutes les options !"
  },
  {
    "q": "Dois-je payer un acompte pour garantir ma place ?",
    "a": "L'inscription en première année est confirmée par le versement d'un acompte de 3 000 euros. Le reste des frais de scolarité annuels est dû avant le début de l'année académique. Pour valider l'abonnement pour les années suivantes, un acompte sera demandé avant le 1er juillet."
  },
  {
    "q": "Quels sont les frais de scolarité annuels à Eugenia School ?",
    "a": "Les frais de scolarité dépendent du programme choisi. Consultez la page dédiée pour connaître les frais de scolarité du programme qui vous intéresse."
  },
  {
    "q": "Comment puis-je financer ma scolarité ?",
    "a": "Eugenia School, avec le soutien d'entreprises partenaires, offre des bourses couvrant jusqu'à 50 % des frais de scolarité annuels. L'attribution de la bourse est basée sur des critères sociaux et académiques. La demande de bourse doit être faite avant l'inscription. Vous pouvez également demander des prêts étudiants auprès des banques partenaires. Le Master of Science se faisant en alternance, l'employeur prend en charge 100 % des frais de scolarité. Pour toute précision : admission@eugeniaschool.com."
  }
];
export const page: LivePage = {
  "title": "FAQ : admission, alternance, financement | Eugenia School",
  "description": "Toutes les réponses sur Eugenia School : admission, programmes Bachelor et MSc, alternance, frais de scolarité et financement. Posez-nous votre question.",
  "h1": "Tu as des questions.",
  "imageAlt": "",
  "lead": "École IA hors Parcoursup : admissions, Bachelor, Master en alternance, frais, financement. Les réponses, rubrique par rubrique. Il manque quelque chose ? Écris-nous.",
  "eyebrow": "// foire aux questions",
  "facts": [],
  "sections": [
    {
      "title": "À propos d'Eugenia School",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Qu'est-ce que Eugenia School ?",
              "a": "Eugenia School fait partie du groupe Albert School ayant pour mission de donner une instruction rigoureuse en business et en data. Elle propose un Bachelor et un Master of Science qui se fait en alternance. Soutenue et financée par de nombreux entrepreneurs de renom, Eugenia School vise à former les talents dont l'économie de demain a besoin : des profils hybrides dans le domaine du business et des données."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Eugenia School fait partie du groupe Albert School ayant pour mission de donner une instruction rigoureuse en business et en data. Elle propose un Bachelor et un Master of Science qui se fait en alternance. Soutenue et financée par de nombreux entrepreneurs de renom, Eugenia School vise à former les talents dont l'économie de demain a besoin : des profils hybrides dans le domaine du business et des données."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quelle est la différence entre Eugenia et Albert School ?",
              "a": "Les deux écoles ont été fondées par les mêmes fondateurs, Grégoire Genest et Mathieu Schimpl, serial entrepreneurs. Albert School s'appuie sur les maths appliquées et une approche quantitative : une IA et une data très techniques (data science, engineering) appliquées au business. Eugenia forme des profils plus opérationnels, entrepreneuriaux et généralistes, des « couteaux suisses » de l'IA appliquée au business, sans maths avancées."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les deux écoles ont été fondées par les mêmes fondateurs, Grégoire Genest et Mathieu Schimpl, serial entrepreneurs. Albert School s'appuie sur les maths appliquées et une approche quantitative : une IA et une data très techniques (data science, engineering) appliquées au business. Eugenia forme des profils plus opérationnels, entrepreneuriaux et généralistes, des « couteaux suisses » de l'IA appliquée au business, sans maths avancées."
        },
        {
          "type": "paragraph",
          "text": "Découvrir l'ADN d'Eugenia →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Pourquoi choisir Eugenia School ?",
              "a": "Les entreprises qui réussissent aujourd'hui partagent une approche centrée sur les données, souvent décrite comme « data driven ». Cette approche n'est possible qu'avec des équipes maîtrisant le langage des données à tous les niveaux et dans toutes les fonctions de l'entreprise. L'apprentissage des données permet aux étudiants de comprendre comment créer de la valeur dans un monde transformé par la technologie."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les entreprises qui réussissent aujourd'hui partagent une approche centrée sur les données, souvent décrite comme « data driven ». Cette approche n'est possible qu'avec des équipes maîtrisant le langage des données à tous les niveaux et dans toutes les fonctions de l'entreprise. L'apprentissage des données permet aux étudiants de comprendre comment créer de la valeur dans un monde transformé par la technologie."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "En quoi la pédagogie d'Eugenia School est-elle innovante ?",
              "a": "La pédagogie innovante d'Eugenia School, centrée sur les données, intègre l'enseignement académique à l'expérience du monde réel, comme en témoignent les BDD en collaboration avec notre réseau entrepreneurial avec Station F ou nos entreprises partenaires telles que Mistral AI, Microsoft ou encore Snapchat. Découvrez la page dédiée à l'explication en détails de notre méthode d'enseignement."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "La pédagogie innovante d'Eugenia School, centrée sur les données, intègre l'enseignement académique à l'expérience du monde réel, comme en témoignent les BDD en collaboration avec notre réseau entrepreneurial avec Station F ou nos entreprises partenaires telles que Mistral AI, Microsoft ou encore Snapchat. Découvrez la page dédiée à l'explication en détails de notre méthode d'enseignement."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Que sont les Business Deep Dives (BDD) ?",
              "a": "Les « Business Deep Dives » sont la signature éducative du groupe Albert School et donc d'Eugenia School. Il s'agit de cas pratiques de 3 à 4 semaines en collaboration avec une entreprise de premier plan, permettant aux étudiants de mettre en pratique ce qu'ils étudient avec des données réelles dans des situations réelles. À la fin de chaque BDD, les étudiants présentent leur travail aux dirigeants de l'entreprise partenaire, et une équipe gagnante est désignée."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les « Business Deep Dives » sont la signature éducative du groupe Albert School et donc d'Eugenia School. Il s'agit de cas pratiques de 3 à 4 semaines en collaboration avec une entreprise de premier plan, permettant aux étudiants de mettre en pratique ce qu'ils étudient avec des données réelles dans des situations réelles. À la fin de chaque BDD, les étudiants présentent leur travail aux dirigeants de l'entreprise partenaire, et une équipe gagnante est désignée."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quelle est la différence entre BDD et Géniathon ?",
              "a": "Les BDD sont les Business Deep Dives, des cas sur lesquels nos étudiants de Bachelor travaillent. Les Géniathons sont les hackathons d'Eugenia et dédiés aux étudiants du Master of Science."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les BDD sont les Business Deep Dives, des cas sur lesquels nos étudiants de Bachelor travaillent. Les Géniathons sont les hackathons d'Eugenia et dédiés aux étudiants du Master of Science."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quels sont les points communs entre les élèves d'Eugenia School ?",
              "a": "Les élèves d'Eugenia School ont en commun l'ambition, l'esprit entrepreneurial, un intérêt marqué pour le monde du business et la conscience que les données joueront un rôle crucial dans leur future profession."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les élèves d'Eugenia School ont en commun l'ambition, l'esprit entrepreneurial, un intérêt marqué pour le monde du business et la conscience que les données joueront un rôle crucial dans leur future profession."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Est-ce que les diplômes d'Eugenia School sont reconnus par l'État ?",
              "a": "Nos diplômes s'appuient sur des titres RNCP (Registre National des Certifications Professionnelles) reconnus par France Compétences. Pour le Bachelor AI Applied to Business, il s'agit du titre RNCP de niveau 6 « Concepteur de solutions no code », délivré par LION (RNCP 41143). Pour le Master of Science AI Applied to Business, il s'agit du titre RNCP de niveau 7 « Architecte en intelligence artificielle », délivré par JEDHA (RNCP 41993)."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Nos diplômes s'appuient sur des titres RNCP (Registre National des Certifications Professionnelles) reconnus par France Compétences. Pour le Bachelor AI Applied to Business, il s'agit du titre RNCP de niveau 6 « Concepteur de solutions no code », délivré par LION (RNCP 41143). Pour le Master of Science AI Applied to Business, il s'agit du titre RNCP de niveau 7 « Architecte en intelligence artificielle », délivré par JEDHA (RNCP 41993)."
        },
        {
          "type": "paragraph",
          "text": "Voir la certification du Bachelor →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quelles perspectives de carrières pour les diplômés d'Eugenia School ?",
              "a": "Les profils hybrides Business et Data développés à Eugenia School répondent à une forte demande des entreprises. Le programme facilite une progression de carrière rapide, préparant les diplômés à une variété de postes à responsabilité tels que Data Analyst, Project Manager, Product Owner, Growth Hacker, et plus encore."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les profils hybrides Business et Data développés à Eugenia School répondent à une forte demande des entreprises. Le programme facilite une progression de carrière rapide, préparant les diplômés à une variété de postes à responsabilité tels que Data Analyst, Project Manager, Product Owner, Growth Hacker, et plus encore."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Qui sont nos professeurs ?",
              "a": "Les enseignants d'Eugenia School sont des professionnels avec une expérience significative dans leurs secteurs de prédilection. La plupart d'entre eux occupent des postes de décision dans le monde professionnel, ce qui leur permet de dispenser un enseignement étroitement aligné sur les réalités de l'industrie."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les enseignants d'Eugenia School sont des professionnels avec une expérience significative dans leurs secteurs de prédilection. La plupart d'entre eux occupent des postes de décision dans le monde professionnel, ce qui leur permet de dispenser un enseignement étroitement aligné sur les réalités de l'industrie."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Y a-t-il des mentors et un suivi individuel ?",
              "a": "Oui, pour le Bachelor comme pour le MSc : chaque étudiant est accompagné par des mentors et bénéficie d'un suivi individuel tout au long du parcours."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui, pour le Bachelor comme pour le MSc : chaque étudiant est accompagné par des mentors et bénéficie d'un suivi individuel tout au long du parcours."
        },
        {
          "type": "paragraph",
          "text": "Rencontrer les professeurs et mentors →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Puis-je visiter l'école ou obtenir une visite individuelle du campus ?",
              "a": "Tout au long de l'année, nous proposons de nombreux événements sur nos campus, tels que des journées portes ouvertes et des journées d'immersion. Les candidats admissibles peuvent également organiser une visite personnalisée du campus en écrivant à admission@eugeniaschool.com."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Tout au long de l'année, nous proposons de nombreux événements sur nos campus, tels que des journées portes ouvertes et des journées d'immersion. Les candidats admissibles peuvent également organiser une visite personnalisée du campus en écrivant à admission@eugeniaschool.com."
        }
      ],
      "eyebrow": "02"
    },
    {
      "title": "Étudier à Eugenia School",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Quelles sont les informations partagées sur le programme français Inserjeunes ?",
              "a": "Vous pouvez obtenir des informations sur le programme français Inserjeunes en cliquant sur le lien suivant : https://www.inserjeunes.education.gouv.fr/diffusion/accueil"
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Vous pouvez obtenir des informations sur le programme français Inserjeunes en cliquant sur le lien suivant : https://www.inserjeunes.education.gouv.fr/diffusion/accueil"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quel est le nombre maximum d'élèves par classe ?",
              "a": "Le nombre maximum d'élèves par classe est de 40."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Le nombre maximum d'élèves par classe est de 40."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "La présence est-elle obligatoire ?",
              "a": "Oui, les cours se font en présentiel."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui, les cours se font en présentiel."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Des ordinateurs sont-ils mis à disposition ?",
              "a": "Les étudiants doivent disposer d’un ordinateur fonctionnel, en particulier pour les cours de data."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les étudiants doivent disposer d’un ordinateur fonctionnel, en particulier pour les cours de data."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quels types de postes sont offerts en apprentissage ?",
              "a": "Nous vous invitons à visiter la page dédiée du programme Master of Science avec les exemples de postes que nos étudiants occupent."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Nous vous invitons à visiter la page dédiée du programme Master of Science avec les exemples de postes que nos étudiants occupent."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Comment recruter un stagiaire, un alternant ou un diplômé ?",
              "a": "Décrivez votre besoin via le formulaire dédié : l'équipe revient vers vous. Stage, alternance (contrats de professionnalisation et d'apprentissage acceptés) ou CDI pour un diplômé."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Décrivez votre besoin via le formulaire dédié : l'équipe revient vers vous. Stage, alternance (contrats de professionnalisation et d'apprentissage acceptés) ou CDI pour un diplômé."
        },
        {
          "type": "paragraph",
          "text": "Recruter nos étudiants →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Eugenia School offre-t-elle un soutien à la rédaction de CV et à la recherche d'entretiens ?",
              "a": "Oui, Eugenia School offre un soutien personnalisé, y compris un programme de coaching et des rencontres avec des entreprises partenaires."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui, Eugenia School offre un soutien personnalisé, y compris un programme de coaching et des rencontres avec des entreprises partenaires."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Qu'est-ce que le rythme d'alternance ?",
              "a": "Le MSc se fait en alternance : après un bootcamp de 5 semaines, le rythme est de 4 jours en entreprise et 1 jour à l'école. La 3e année du Bachelor peut aussi se faire en alternance."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Le MSc se fait en alternance : après un bootcamp de 5 semaines, le rythme est de 4 jours en entreprise et 1 jour à l'école. La 3e année du Bachelor peut aussi se faire en alternance."
        },
        {
          "type": "paragraph",
          "text": "Voir la 3e année en alternance →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quels types de contrats sont acceptés pour l'alternance : professionnalisation ou apprentissage ?",
              "a": "Les contrats de professionnalisation et d'apprentissage sont acceptés."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les contrats de professionnalisation et d'apprentissage sont acceptés."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quand puis-je effectuer un stage pendant mon bachelor ?",
              "a": "Il y a deux périodes de stage : la première de minimum 6 semaines, pendant l'été entre la 1ère et la 2ème année. La deuxième, de six mois au début de la troisième année."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Il y a deux périodes de stage : la première de minimum 6 semaines, pendant l'été entre la 1ère et la 2ème année. La deuxième, de six mois au début de la troisième année."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Eugenia School propose-t-elle un coaching pour des compétences telles que la gestion d'équipe ou la négociation ?",
              "a": "Oui, Eugenia School offre un coaching constant par le biais de diverses activités, notamment deux semaines de pré-rentrée avec en trame une activité de pitch à réaliser à la manière de QVEMA, des cours pratiques de business et des Business Deep Dives."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui, Eugenia School offre un coaching constant par le biais de diverses activités, notamment deux semaines de pré-rentrée avec en trame une activité de pitch à réaliser à la manière de QVEMA, des cours pratiques de business et des Business Deep Dives."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Y a-t-il des projets de groupe ?",
              "a": "Oui, les projets personnels et les projets de groupe sont des éléments cruciaux à Eugenia School. Le travail en groupe est mis en avant lors des Business Deep Dives et des Géniathons, généralement en équipes de 3 à 6 personnes."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui, les projets personnels et les projets de groupe sont des éléments cruciaux à Eugenia School. Le travail en groupe est mis en avant lors des Business Deep Dives et des Géniathons, généralement en équipes de 3 à 6 personnes."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Combien de temps faut-il consacrer aux devoirs ?",
              "a": "La charge de travail varie en fonction de la semaine, du rythme de travail et de l'organisation. Il faut s'attendre à consacrer environ 10 à 15 heures par semaine au travail personnel et de groupe. Certains contenus ou lectures devront être revus avant d'assister aux cours."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "La charge de travail varie en fonction de la semaine, du rythme de travail et de l'organisation. Il faut s'attendre à consacrer environ 10 à 15 heures par semaine au travail personnel et de groupe. Certains contenus ou lectures devront être revus avant d'assister aux cours."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "En quelle langue parlent les professeurs ?",
              "a": "La consigne donnée est de parler en français. En revanche, un certain niveau d'anglais est demandé : les supports de cours sont en anglais et les outils data sont, pour la plupart, aussi en anglais."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "La consigne donnée est de parler en français. En revanche, un certain niveau d'anglais est demandé : les supports de cours sont en anglais et les outils data sont, pour la plupart, aussi en anglais."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Puis-je intégrer une autre école de commerce après avoir obtenu un bachelor d'Eugenia School ?",
              "a": "Le diplôme de bachelor d'Eugenia School est reconnu et vous permet de postuler à des masters à Eugenia School ou dans toute autre université qui exige un diplôme de bachelor pour l'admission."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Le diplôme de bachelor d'Eugenia School est reconnu et vous permet de postuler à des masters à Eugenia School ou dans toute autre université qui exige un diplôme de bachelor pour l'admission."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Y a-t-il une vie associative à Eugenia School ?",
              "a": "Oui ! Les associations sont mixtes entre Eugenia et Albert School. Un BDE, une Junior Entreprise, une association de running et tant d'autres existent déjà mais nous favorisons la création de nouvelles associations tous les ans."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui ! Les associations sont mixtes entre Eugenia et Albert School. Un BDE, une Junior Entreprise, une association de running et tant d'autres existent déjà mais nous favorisons la création de nouvelles associations tous les ans."
        }
      ],
      "eyebrow": "03"
    },
    {
      "title": "Processus de candidature",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Quelle est la date limite pour accepter mon admission ?",
              "a": "Félicitations ! Le choix de votre école est l'une des décisions les plus importantes de votre vie. Il n'y a pas de délai pour accepter l'offre. Votre place est réservée pendant 10 jours après la notification d'admission. Ensuite, votre inscription sera acceptée en fonction des places disponibles."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Félicitations ! Le choix de votre école est l'une des décisions les plus importantes de votre vie. Il n'y a pas de délai pour accepter l'offre. Votre place est réservée pendant 10 jours après la notification d'admission. Ensuite, votre inscription sera acceptée en fonction des places disponibles."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quand recevrai-je mes résultats d'admission ?",
              "a": "Les résultats sont fournis dans un délai de 10 jours après chaque étape du processus de sélection."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les résultats sont fournis dans un délai de 10 jours après chaque étape du processus de sélection."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "En quoi consiste le processus de sélection ?",
              "a": "Consultez la page dédiée pour en savoir plus."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Consultez la page dédiée pour en savoir plus."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quelles sont les conditions requises pour intégrer Eugenia School ?",
              "a": "Eugenia School est ouvert aux lycéens de terminale générale ou technologique avec un intérêt pour les nouvelles technologies. L'ADN entrepreneurial est un plus. Pour les masters, il faut être titulaire d'un bac+3, soit 180 crédits ECTS, avec l'envie d'avoir une formation technique. Le bootcamp de M1 reprend les bases de l'analyse de données."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Eugenia School est ouvert aux lycéens de terminale générale ou technologique avec un intérêt pour les nouvelles technologies. L'ADN entrepreneurial est un plus. Pour les masters, il faut être titulaire d'un bac+3, soit 180 crédits ECTS, avec l'envie d'avoir une formation technique. Le bootcamp de M1 reprend les bases de l'analyse de données."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Puis-je rejoindre Eugenia School après une autre filière ?",
              "a": "Oui. Pour le MSc, il faut être titulaire d'un bac+3 (180 crédits ECTS), quelle que soit la filière d'origine, avec l'envie d'acquérir une base technique : le bootcamp de démarrage reprend les bases de l'analyse de données."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui. Pour le MSc, il faut être titulaire d'un bac+3 (180 crédits ECTS), quelle que soit la filière d'origine, avec l'envie d'acquérir une base technique : le bootcamp de démarrage reprend les bases de l'analyse de données."
        },
        {
          "type": "paragraph",
          "text": "Découvrir le MSc →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quand et comment puis-je poser ma candidature ?",
              "a": "Consultez notre page concernant le processus de candidature pour obtenir les informations nécessaires pour postuler à chacun de nos programmes."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Consultez notre page concernant le processus de candidature pour obtenir les informations nécessaires pour postuler à chacun de nos programmes."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Combien coûte la candidature ?",
              "a": "La candidature est gratuite pour les candidats résidant dans l'Union européenne. Pour les candidats résidant hors de l'Union européenne, elle coûte 30 €."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "La candidature est gratuite pour les candidats résidant dans l'Union européenne. Pour les candidats résidant hors de l'Union européenne, elle coûte 30 €."
        },
        {
          "type": "paragraph",
          "text": "Candidater →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quand a lieu la rentrée ?",
              "a": "La rentrée a lieu uniquement en septembre. Il n'y a pas de rentrée en janvier."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "La rentrée a lieu uniquement en septembre. Il n'y a pas de rentrée en janvier."
        },
        {
          "type": "paragraph",
          "text": "Voir le processus d'admission →"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Faut-il s'inscrire sur Parcoursup ou Mon Master ?",
              "a": "Non, Eugenia School n'est pas répertoriée sur Parcoursup ou Mon Master. Les candidatures se font directement sur cette page."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Non, Eugenia School n'est pas répertoriée sur Parcoursup ou Mon Master. Les candidatures se font directement sur cette page."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Une lettre de motivation est-elle nécessaire pour postuler ?",
              "a": "Il est recommandé d’inclure tous les documents pertinents dans votre candidature, tels que les relevés de notes, les certificats linguistiques, les diplômes et les lettres de recommandation."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Il est recommandé d’inclure tous les documents pertinents dans votre candidature, tels que les relevés de notes, les certificats linguistiques, les diplômes et les lettres de recommandation."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Sur quoi porte l'entretien de motivation ?",
              "a": "L'entretien se compose de trois parties : faire connaissance, un casse-tête logique et une explication de vos motivations."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "L'entretien se compose de trois parties : faire connaissance, un casse-tête logique et une explication de vos motivations."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Que dois-je faire si je ne peux pas compléter ma candidature parce qu'il me manque des relevés de notes ?",
              "a": "Téléchargez deux fois le même document si vos relevés de notes sont semestriels et non trimestriels. Le jury comprendra."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Téléchargez deux fois le même document si vos relevés de notes sont semestriels et non trimestriels. Le jury comprendra."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Puis-je soumettre ma candidature si je n'ai pas encore mes notes de l'année en cours ?",
              "a": "Oui, vous pouvez entamer la procédure d'admission et soumettre les notes manquantes plus tard."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Oui, vous pouvez entamer la procédure d'admission et soumettre les notes manquantes plus tard."
        }
      ],
      "eyebrow": "04"
    },
    {
      "title": "Frais de scolarité et financement",
      "blocks": [
        {
          "type": "faq",
          "items": [
            {
              "q": "Existe-t-il des logements sur le campus ?",
              "a": "Non, mais des solutions sont mises en place pour trouver chaussures à votre pied, contactez-nous pour avoir toutes les options !"
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Non, mais des solutions sont mises en place pour trouver chaussures à votre pied, contactez-nous pour avoir toutes les options !"
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Dois-je payer un acompte pour garantir ma place ?",
              "a": "L'inscription en première année est confirmée par le versement d'un acompte de 3 000 euros. Le reste des frais de scolarité annuels est dû avant le début de l'année académique. Pour valider l'abonnement pour les années suivantes, un acompte sera demandé avant le 1er juillet."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "L'inscription en première année est confirmée par le versement d'un acompte de 3 000 euros. Le reste des frais de scolarité annuels est dû avant le début de l'année académique. Pour valider l'abonnement pour les années suivantes, un acompte sera demandé avant le 1er juillet."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Quels sont les frais de scolarité annuels à Eugenia School ?",
              "a": "Les frais de scolarité dépendent du programme choisi. Consultez la page dédiée pour connaître les frais de scolarité du programme qui vous intéresse."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Les frais de scolarité dépendent du programme choisi. Consultez la page dédiée pour connaître les frais de scolarité du programme qui vous intéresse."
        },
        {
          "type": "faq",
          "items": [
            {
              "q": "Comment puis-je financer ma scolarité ?",
              "a": "Eugenia School, avec le soutien d'entreprises partenaires, offre des bourses couvrant jusqu'à 50 % des frais de scolarité annuels. L'attribution de la bourse est basée sur des critères sociaux et académiques. La demande de bourse doit être faite avant l'inscription. Vous pouvez également demander des prêts étudiants auprès des banques partenaires. Le Master of Science se faisant en alternance, l'employeur prend en charge 100 % des frais de scolarité. Pour toute précision : admission@eugeniaschool.com."
            }
          ],
          "idPrefix": "faq"
        },
        {
          "type": "paragraph",
          "text": "Eugenia School, avec le soutien d'entreprises partenaires, offre des bourses couvrant jusqu'à 50 % des frais de scolarité annuels. L'attribution de la bourse est basée sur des critères sociaux et académiques. La demande de bourse doit être faite avant l'inscription. Vous pouvez également demander des prêts étudiants auprès des banques partenaires. Le Master of Science se faisant en alternance, l'employeur prend en charge 100 % des frais de scolarité. Pour toute précision : admission@eugeniaschool.com."
        },
        {
          "type": "paragraph",
          "text": "Voir le financement →"
        }
      ]
    }
  ],
  "internalLinks": [
    {
      "label": "Candidater →",
      "href": "/candidature"
    },
    {
      "label": "Nous écrire",
      "href": "/contact"
    },
    {
      "label": "À propos d'Eugenia School",
      "href": "#a-propos-d-eugenia-school"
    },
    {
      "label": "Étudier à Eugenia School",
      "href": "#etudier-a-eugenia-school"
    },
    {
      "label": "Processus de candidature",
      "href": "#processus-de-candidature"
    },
    {
      "label": "Frais de scolarité et financement",
      "href": "#frais-de-scolarite-et-financement"
    },
    {
      "label": "Découvrir l'ADN d'Eugenia →",
      "href": "/notre-adn"
    },
    {
      "label": "Voir la certification du Bachelor →",
      "href": "/certification-concepteur-solutions-no-code"
    },
    {
      "label": "Rencontrer les professeurs et mentors →",
      "href": "/approche-pedagogique"
    },
    {
      "label": "Recruter nos étudiants →",
      "href": "/recruter-nos-etudiants"
    },
    {
      "label": "Voir la 3e année en alternance →",
      "href": "/programme/bachelor-ia-business-3eme-annee-alternance"
    },
    {
      "label": "Découvrir le MSc →",
      "href": "/programme/master-ia-business-alternance"
    },
    {
      "label": "Candidater →",
      "href": "/candidature"
    },
    {
      "label": "Voir le processus d'admission →",
      "href": "/processus-admission"
    },
    {
      "label": "Voir le financement →",
      "href": "/financement"
    },
    {
      "label": "Candidater",
      "href": "/candidature"
    }
  ],
  "footer": {
    "title": "Prêt à candidater ?",
    "text": "Candidature gratuite, hors Parcoursup et hors Mon Master.",
    "primary": {
      "label": "Candidater →",
      "href": "/candidature"
    },
    "secondary": {
      "label": "Prochain événement",
      "href": "/evenements"
    }
  },
  "next": {
    "href": "/admissions",
    "title": "Admissions",
    "text": "Voir les admissions",
    "image": "p_arches"
  }
};

page.jsonLd = [faqPageLd(items)];
