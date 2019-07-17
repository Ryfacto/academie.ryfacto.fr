---
layout: article
image:
title: Test-Driven Development - Premiers pas avec FizzBuzz
description: aa
date: 13/07/2019
updated_at: 13/07/2019
published: false
beta: true
writing_time: 1
ahah: 1
technical_environment:
  swift: 5
  ios: 12.2
  xcode: 10.2.1
comments:
---

Dans [l'article précédent](construire-une-architecture-emergente), je te parlais de l'importance des tests pour faire émerger l'architecture.

J'évoquais aussi le fait que [TDD permet d'être plus productif](construire-une-architecture-emergente#automatiser-les-tests) en combattant l'idée reçue "Écrire des tests revient à écrire plus de code, donc c'est plus lent".

> Tu m'as convaincu que TDD était LA pratique à apprendre. Mais comment je fais concrètement ?

Je vais te le montrer à travers cet article justement !

Nous allons entrer dans le vif du sujet avec une approche par l'exemple comme l'a fait Kent Beck (le papa de TDD) le 8 novembre 2002 (17 ans déjà !) lorsqu'il a publié son livre ["Test-Driven Development by Example"](https://amzn.to/2l8qHa3).

<!--more-->

## FizzBuzz

Le premier exemple se base sur un kata de code, le kata ["FizzBuzz"](http://kata-log.rocks/fizz-buzz-kata).

J'ai volontairement choisi un premier exemple qui ne reflète pas la réalité de ton quotidien pour que tu puisses te concentrer sur la pratique du TDD.

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

Je vérifie ensuite que mes tests s'exécutent correctement à l'aide d'un petit `⌘U` dans Xcode.

Je t'invite à [télécharger le projet de départ](tdd-intro-resources/code/TDDFizzBuzz.zip). Comme ça tu pourras faire les différentes étapes avec moi.

Pour cet exemple je vais exécuter les tests au sein de l'app.

Le problème c'est que ce n'est pas performant lorsque l'on écrit des tests pour une véritable app.

Je te montrerai dans le prochain article (où nous allons créer une véritable app iOS en TDD), comment faire pour exécuter les tests indépendamment de l'app. [Inscris-toi à la newsletter](signup) pour ne pas le louper !

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

C'est bon ?

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

## Étape 4 : le premier test rouge

> Enfin !

Le suspens était à son comble mais nous y sommes !

L'écriture du premier test rouge !

### 1er test : le test marche-pied de "création"

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

Fais passer le test en créant une `struct` __FizzBuzz__ juste au-dessus de la classe de test dans le fichier __FizzBuzz_Spec.swift__.

{% highlight swift %}
struct FizzBuzz {

}
{% endhighlight %}

Relance le test avec `⌘U`.

Il passe ! C'est la phase __GREEN__ de TDD : je fais passer le test le plus vite possible.

> Il est un peu inutile ce test non ?



OUTLINE

Quatrième étape : le premier test rouge
  > Enfin !

  1er test : création
    - Suppression du test pour vérifier l'environnement
    - Création du fichier de test au plus proche du code de prod
  J'écris le plus petit test possible qui me fait écrire le plus petit bout de code possible.
  Ici c'est un test "marche-pied" qui me permets de mettre simplement le pied à l'étrier et me forcer à créer la classe.
  `<code du test marche-pied>`
  Dans un prochain article, je montrerai un exemple de l'importance de fonctionner par petites étapes, de commencer par les tests les plus simples, au risque de se retrouver à écrire tout l'algo d'un coup si on ne le fait pas. Pour ne pas le rater, [inscris-toi à la newsletter !](signup)

Cinquième étape : faire passer le test le plus vite possible
  Enfin je fais passer le test le plus vite possible.
  Je crée le type au même endroit que les tests.
  `<code qui fait passer le test>`

Sixième étape (mon étape préféré) : refactoring !
  D'où le nom Ryfacto pour ma petite boîte, aaaah !

  > On n'est pas là pour parler de Ryfacto ou bien ?

  Non, désolé...
  Quelles crimes de conception ai-je commis ici ?
  - Type dispo que dans les tests
  Je bouge donc ce type dans un fichier dédié dans le code de prod. `FizzBuzz.swift`

Septième étape : je mets à jour la liste
  `<liste mise à jour>`

Et le cycle recommence !
  Prochain test : FizzBuzz avec 0
    `let result = fizzBuzz.upTo(0)`
    Une erreur de compilation == un test qui échoue, je m'arrête !
    J'implémente la méthode pour faire compiler avec fatalError.
    Assertion sur la liste de string.
    Je lance les tests : ils échouent évidemment. Quelle tristesse ! Non, un test qui échoue c'est progresser !
    Je fais passer le test le plus vite possible en retournant une liste vide.
    Refactoring : quels crimes ai-je commis ?
      Duplication dans les tests : deux tests sur la création.
        Je supprime le premier test.

  FizzBuzz avec -1
    Le système de type à la rescousse !
    La méthode `upTo` prends en argument un `UInt` plutôt qu'un `Int`.
    Je m'épargne un test !

  FizzBuzz avec 1
    Nouveau test avec assertions equal `[ "1" ]`
    On retourne en dure `[ "1" ]`
    Oups j'ai cassé le premier test.
    Je reviens en arrière.
    Le deuxième échoue comme avant.
    Je dois réflechir...
    J'implémente avec un if
    `if i == 0 { return [] }; return [ "1" ]`
    Refactoring !
      Duplication dans les valeurs : je dois généraliser en utilisant les paramètres.
      "1" devient `i.description`
      Duplication dans les tests -> transformation en given-when-then (pourquoi ? Documentation bien écrite !)
