---
layout: article
image: /images/2019/12/intro-tdd.jpg
title: Introduction à TDD en Swift (Partie 1) - 7 étapes essentielles
description: Apprends les bases de TDD en Swift par l'exemple. Démarre avec un premier cycle complet de 7 étapes !
date: 11/12/2019
updated_at: 11/12/2019
published: true
beta: false
writing_time: 5
ahah: 2
reading_time: 10
content_type: Tutoriel
technical_environment:
  swift: 5
  ios: 12.2
  xcode: 10.2.1
  appcode: 2019.1.4
comments:
---

<div class="article-series">
  <p>Cet article fait partie de la série <em>"Introduction à TDD en Swift"</em></p>
  <ul>
    <li><strong>Introduction à TDD en Swift (Partie 1) - 7 étapes essentielles</strong></li>
    <li class="coming-soon">Introduction à TDD en Swift (Partie 2) - Vive le typage et la généralisation <em>(bientôt dispo)</em></li>
    <li class="coming-soon">Introduction à TDD en Swift (Partie 3) - Une bonne documentation <em>(bientôt dispo)</em></li>
  </ul>
</div>

Dans [l'article précédent](construire-une-architecture-emergente), je te parlais de l'importance des tests pour faire émerger l'architecture.

J'évoquais aussi le fait que [TDD permet d'être plus productif](construire-une-architecture-emergente#automatiser-les-tests) en combattant l'idée reçue "Écrire des tests revient à écrire plus de code, donc c'est plus lent".

> Tu m'as convaincu que TDD était LA pratique à apprendre. Mais comment je fais concrètement ?

Je vais te le montrer à travers ce tutoriel justement !

Nous allons entrer dans le vif du sujet avec une approche par l'exemple comme l'a fait Kent Beck (le papa de TDD) le 8 novembre 2002 (17 ans déjà !) lorsqu'il a publié son livre ["Test-Driven Development by Example"](https://amzn.to/2l8qHa3).

<!--more-->

## FizzBuzz

Le premier exemple se base sur un kata de code, le kata [FizzBuzz](http://kata-log.rocks/fizz-buzz-kata).

J'ai volontairement choisi un premier exemple __qui ne reflète pas la réalité__ de ton quotidien pour que tu puisses __te concentrer sur la pratique du TDD__.

### Énoncé

- Écris un programme qui affiche une ligne pour chaque nombre de 1 à 100.
- Pour les multiples de `3`, affiche `Fizz` au lieu du nombre.
- Pour les multiples de `5`, affiche `Buzz` au lieu du nombre.
- Pour les nombres qui sont à la fois des multiples de `3` et de `5`, affiche `FizzBuzz` au lieu du nombre.

Prêt à relever le défi ? C'est parti ! 💪

## Étape 0 : je prépare mon environnement

Qui dit écrire des tests, dit pouvoir les lancer !

Je commence par créer le projet : une app iOS "Single View App" avec des tests unitaires que j'appelle `TDDFizzBuzz`.

![Création du Projet](tdd-intro-resources/images/0-project-creation.png)

Je vérifie ensuite que mes tests s'exécutent correctement à l'aide de `⌘U` dans Xcode.

Je t'invite à [télécharger le projet de départ](tdd-intro-resources/code/TDDFizzBuzz.zip). Comme ça tu pourras faire les différentes étapes avec moi.

Pour cet exemple je vais exécuter les tests au sein de l'app.

Le problème c'est que ce n'est pas performant lorsque l'on écrit des tests pour une véritable app.

Je te montrerai dans un prochain tutoriel (où nous allons créer une véritable app iOS en TDD), comment faire pour exécuter les tests indépendamment de l'app.

_(Psst...[direction la newsletter](signup) pour ne pas le louper !)_

## Étape 1 : quels sont les comportements attendus ?

> Whaaaaat ? Je croyais que la première étape de TDD était le test rouge ! Mais là tu...

Hola, hola ! Du calme mon ami(e) !

Je me permets une petite aparté.

Bien que TDD existe depuis longtemps et soit très bien documenté par Kent Beck dans son livre.

Il s'avère que c'est une pratique qui a été interprétée, détournée, galvaudée, et j'en passe.

Je tiens à revenir aux idées originales présentées dans le livre.

Et il se trouve, aussi étonamment que cela puisse paraître, que la première chose à faire selon l'auteur soit de lister les __comportements__ attendus.

J'insiste bien sur le terme __comportement__.

En d'autres termes, quels sont les tests à écrire pour spécifier ces comportements ?

_Je t'invite à faire l'exercice de ton côté. Liste tous les tests (comportements !) pour `FizzBuzz`._

...

...

...

Tu ne l'as pas fait n'est-ce pas ?

Pour que ce tutoriel t'apporte le plus de valeur, je t'encourage vivement à faire l'exo !

Allez, j'ai confiance en toi !

...

...

...

Bon, avoue que tu ne l'as toujours pas fait ?

Tu es grand(e), tu fais comme tu veux, mais je t'aurais prévenu ! 😉

...

...

...

C'est bon ? Super !

Voici ma liste :

<table>
  <tr><td>100 -> [1, 2, Fizz, 4, Buzz, Fizz, ... ]</td></tr>
  <tr><td>creation</td></tr>
  <tr><td>3 -> [1, 2, Fizz]</td></tr>
  <tr><td>5 -> last == Buzz</td></tr>
  <tr><td>15 -> last == FizzBuzz</td></tr>
  <tr><td>0 -> []</td></tr>
  <tr><td>-1 -> []</td></tr>
  <tr><td>1 -> [1]</td></tr>
</table>

J'ai pour habitude d'écrire cette liste en commentaire dans le code de la classe de test que je suis en train d'écrire.

Le plus important est d'avoir cette liste sous les yeux car nous allons la mettre à jour continuellement quand d'autres tests nous viendront en tête ou quand nous aurons fini d'écrire un test.

J'utilise aussi cette liste pour noter les améliorations possibles quand je ne souhaite pas les faire d'emblée.

## Étape 2 : dans quel ordre j'écris les tests ?

J'utilise un algorithme simple pour déterminer l'ordre de priorité.

1. Quel test me fera écrire le moins de code ? Autrement dit, quel est le test le plus simple à faire passer ?
2. Ai-je des cas à la marge à gérer ? Exemple : string vide, valeurs nil, liste vide, etc.

_À toi de jouer ! Priorise ta liste._

...

...

...

Job done ?

Moi oui ! Voici ma liste priorisée avec quelques explications :

<table>
  <thead><tr><th>Test</th><th>Pourquoi ?</th></tr></thead>
  <tr><td>creation</td><td>Me poussera à simplement créer le type.</td></tr>
  <tr><td>0 -> []</td><td>Cas à la marge</td></tr>
  <tr><td>-1 -> []</td><td>Cas à la marge</td></tr>
  <tr><td>1 -> [1]</td><td>Cas simple : afficher le numéro sous forme de string</td></tr>
  <tr><td>3 -> [1, 2, Fizz]</td><td>Première règle métier</td></tr>
  <tr><td>5 -> last == Buzz</td><td>Deuxième règle métier</td></tr>
  <tr><td>15 -> last == FizzBuzz</td><td>Troisième règle métier</td></tr>
  <tr><td>100 -> [1, 2, Fizz, 4, Buzz, Fizz, ... ]</td><td>Test d'acceptance</td></tr>
</table>

> Pourquoi commencer par les tests les plus simples et ceux à la marge ?

Très bonne question !

Si je commence par les tests concernant les règles métiers, je risque de me retrouver bloqué.

Je risque de devoir implémenter tout l'algo, ou une grosse partie d'un coup !

Dans un prochain article, je te montrerai un exemple qui illustre un blocage si on ne priorise pas correctement. Pour ne pas le rater, [je t'invite à t'inscrire à la newsletter](signup).

## Étape 3 : un peu de conception

Qui a dit que TDD voulait dire foncer tête baissée sans concevoir ?

Cette phase est très importante.

J'imagine l'API (Application Programming Interface) la plus simple possible qui me permettra d'écrire les premiers tests.

Je peux faire cette exercice dans ma tête ou sur tableau blanc.

Je peux en discuter avec mon pair si je travaille en pair programming.

_Je t'invite à concevoir cette API avant de continuer ta lecture._

...

...

...

Voici ce que j'ai imaginé, sur tableau blanc en utilisant un peu d'UML.

![UML FizzBuzz](tdd-intro-resources/images/1-uml.jpg)

## Étape 4 : le premier test rouge (RED)

> Enfin !

Le suspens était à son comble mais nous y sommes !

L'écriture du premier test rouge !

### Le test marche-pied de "création"

Si ce n'est pas déjà fait, [télécharge le projet de départ](tdd-intro-resources/code/TDDFizzBuzz.zip).

Afin de bien démarrer, supprime le fichier __TDDFizzBuzzTests.swift__ qui servait simplement à vérifier l'environnement.

Crée ensuite un groupe __FizzBuzz__ dans le groupe __TDDFizzBuzz__.

Crée ensuite le premier fichier de test __FizzBuzz_Spec.swift__ dans le groupe __FizzBuzz__ et veille bien à l'ajouter à la target __TDDFizzBuzzTests__.

_(Pour je ne sais quelle raison, Xcode propose de créer un Bridging Header. Réponds "Don't create" et tout ira bien !)_

Ensuite écris le code suivant dans __FizzBuzz_Spec.swift__ :

{% highlight swift %}
import XCTest
@testable import TDDFizzBuzz

class FizzBuzz_Spec: XCTestCase {

}
{% endhighlight %}

Et enfin le premier test à l'intérieur de la classe __FizzBuzz_Spec__ :

{% highlight swift %}
func test_Creation() {
  _ = FizzBuzz()
}
{% endhighlight %}

> Ça ne compile même pas !

Parfait ! Un code qui ne compile pas équivaut à un test qui échoue.

C'est la phase __RED__ de TDD. J'écris d'abord un test qui échoue.

J'utilise ici un type qui n'existe pas encore, cette technique a été nommée __programming by wishful thinking__ par Abelson, Harold et Gerald Sussman dans leur ouvrage : _Structure and Interpretations of Computer Programs_, MIT Press, 1996 (ISBN : 978-0262011532).

Cela nous aide à concevoir les API les plus simples possibles et à valider notre conception initiale.

## Étape 5 : je fais passer le test le plus vite possible (GREEN)

Fais passer le test en créant une `struct FizzBuzz` juste au-dessus de la classe de test dans le fichier __FizzBuzz_Spec.swift__.

{% highlight swift %}
struct FizzBuzz {

}
{% endhighlight %}

Relance le test avec `⌘U`.

Il passe ! C'est la phase __GREEN__ de TDD : je fais passer le test le plus vite possible.

> Il est un peu inutile ce test non ?

Il peut sembler inutile, il n'empêche qu'il m'a poussé à créer la `struct`, il m'a permis de mettre le pied à l'étrier.

Il m'a permis...de progresser !

C'est un test que l'on appelle "test marche-pied".

En TDD, tu peux avancer par petites étapes, les anglophones parlent de "baby steps".

Pour autant, ce n'est pas parce que tu peux le faire que tu vas toujours le faire.

Il m'arrive de sauter ce test pour aller plus vite.

Ce n'est pas "interdit" par la pratique de TDD.

Mais je sais que si je le souhaite, je peux ralentir pour y aller plus progressivement.

## Étape 6 (ma préférée) : j'améliore la structure ! (REFACTORING)

Posons-nous la question suivante : _quelles crimes de conception avons-nous commis ?_

> Sur un code si simple, avons-nous vraiment commis des crimes de conception ?

Oui, un petit crime en réalité. 😉

Je te laisse un petit temps de reflexion.

...

...

...

Alors ?

> Ah je sais ! `FizzBuzz` est inutilisable dans le code de production puisqu'elle est dans le fichier de test !

Exactement ! Bien joué !

Du coup, comment règle-t-on le soucis ?

> On crée un nouveau fichier pour y mettre `FizzBuzz`.

Parfait !

Crée le fichier __FizzBuzz.swift__ juste à côté du fichier de test.

Maintenant déplace la `struct FizzBuzz` dans ce fichier et relance les tests.

## Étape 7 : je mets à jour la liste

J'ai fini d'écrire le premier test, je peux donc mettre à jour la liste en retirant ce test.

<table>
  <tr><td>0 -> []</td></tr>
  <tr><td>-1 -> []</td></tr>
  <tr><td>1 -> [1]</td></tr>
  <tr><td>3 -> [1, 2, Fizz]</td></tr>
  <tr><td>5 -> last == Buzz</td></tr>
  <tr><td>15 -> last == FizzBuzz</td></tr>
  <tr><td>100 -> [1, 2, Fizz, 4, Buzz, Fizz, ... ]</td></tr>
</table>

🎉 Tu viens de terminer ton premier cycle TDD, bravo !

Résumons les étapes d'un cycle TDD :
1. je crée ou mets à jour la liste des __comportements attendus__,
2. j'ordonne la liste en commençant par les tests les plus simples (ceux qui me feront écrire le moins de code) ainsi que les cas à la marge ; pour éviter de me retrouver bloqué,
3. je fais juste assez de conception pour m'aider à écrire les tests, et surtout le premier,
4. j'écris le premier test en utilisant du code qui n'existe pas, c'est la phase __RED__,
5. je fais passer le test sans me préoccuper des horreurs de conception que je fais, c'est la phase __GREEN__,
6. je nettoie les dites horreurs, c'est la phase __REFACTORING__,
7. je mets à jour ma liste et je recommence tant qu'elle n'est pas vide !

> Pourquoi ne pas écrire directement du code bien conçu ?

Certains pratiquants du TDD le font.

Il m'arrive aussi de le faire de temps en temps.

Il faut cependant avoir conscience que vouloir _"faire correctement tout de suite"_ c'est prendre le risque de faire de la sur-ingénierie, d'écrire du code au cas où, du code qui n'est pas requis par un test qui échoue.

Et puis, c'est plus difficile de faire _bien_ tout de suite.

J'aime bien cette idée d'aller très vite en __GREEN__ sans se préoccuper de la conception.

Puis dans la phase de __REFACTORING__ prendre du recul, de la hauteur et vraiment me concentrer sur la bonne conception.

Si tu débutes en TDD, je t'encourage vivement à y aller doucement.

__Je te dis à très vite dans le prochain article de cette série <em>"Introduction à TDD en Swift"</em> !__

Pour ne pas le louper, c'est par là ! 👇
