##                           Construire une API sécurisé pour une application d’avis gastronomique





Contexte du projet

So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création
de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise
souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront
ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.



Réalisation de l’API

Points de vigilance
L’entreprise ayant subi quelques attaques sur son site web ces dernières semaines, le
fondateur souhaite que les données des utilisateurs soient parfaitement protégées.
Pour cela, l’API utilisée devra impérativement respecter des pratiques de code sécurisé.
Exigences concernant la sécurité :
l’API doit respecter le RGPD et les standards OWASP;
* le mot de passe des utilisateurs doit être chiffré ;
*  2 types de droits administrateur à la base de données doivent être définis : un accès
pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base
de données ;
* la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB
Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis
sa machine ;
* l’authentification est renforcée sur les routes requises ;
* les mots de passe sont stockés de manière sécurisée ;
* les adresses mails de la base de données sont uniques et un plugin Mongoose
approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.



Pour commencer 

Frontend :

git clone https://github.com/OpenClassrooms-Student-Center/dwj-projet6.git frontend
* cd frontend
* npm install
* npm start
* Ne pas oublier node-sass à installer


Backend :

git clone https://github.com/Chris-Delarue/So-Pecocko.git backend
* cd backend
* npm install
* nodemon server

Avant d'acceder à l'application, vous devez créer fichier .env dans la'root directory' (dossier back).
A l'interieur du fichier .env, ajouter une variable spécifique comme ci-dessous

DB_URI="mongodb+srv://votre MongoDB_ID:votre Password@votre cluster..mongodb.net/votre Database name?retryWrites=true&w=majority"
Ensuite dans votre navigateur : http://localhost:4200/



Connaissance aquise:

Utilisation de Node.js, Express, MongoDB
