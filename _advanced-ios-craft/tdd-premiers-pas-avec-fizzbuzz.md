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

Je t'invite à faire l'exercice de ton côté. Liste tous les tests (comportements !) pour `FizzBuzz`.

...

...


C'est bon ?

Voici ma liste :

{% highlight swift %}
// upTo 100 -> [1, 2, Fizz, 4, Buzz, Fizz, ... ]
// creation
// upTo 0 -> []
// upTo -1 -> []
// upTo 3 -> last Fizz
// upTo 5 -> last Buzz
// upTo 15 -> last FizzBuzz
{% endhighlight %}

J'ai pour habitude d'écrire cette liste en commentaire dans le code de la classe de test que je suis en train d'écrire.

Le plus important est d'avoir 

## Étape 3 : je conçois

OUTLINE

Étape 1 : je liste tous les tests qui me viennent en tête
  J'ai pour habitude d'écrire cette liste en commentaire dans le code.
  Ça peut être fait sur un fichier à côté, sur le tableau blanc, on s'en fiche.
  Le plus important est d'avoir cette liste sous les yeux, tu vas la mettre à jour continuellement quand d'autres tests te viendras en tête ou quand tu auras fini d'écrire des tests.
  Voici ma liste en vrac pour l'instant : `<liste ici>`

Étape 2 : je priorise la liste
  Qui a dit que TDD voulait dire foncer tête baisser sans concevoir ?
  Tu vas commencer par écrire les tests qui te font écrire le moins de code : les tests les plus simple.
  Tu priorises aussi en commençant par les cas à la marge : valeurs nil, string vide, liste vide, nombre 0, nombre négatif, etc.
  Voici ma liste priorisée et l'explication des priorités : `<liste ici avec commentaires sur pourquoi>`

Étape 3 : je conçois
  Phase de conception que l'on peut faire : dans sa tête ou sur un tableau blanc à plusieurs.
  UML communément admis dans l'industrie, donc un bon moyen de communiquer sa conception.
  Voici ce que j'ai imaginé : `<photo du tableau blanc>`

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
