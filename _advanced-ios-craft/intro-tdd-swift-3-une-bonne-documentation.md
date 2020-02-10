---
layout: article
image: /images/2020/02/intro-tdd-3.jpeg
title: Introduction à TDD en Swift (Partie 3) - Une bonne documentation
description: Termine avec moi l'exemple FizzBuzz. Nous allons nous concentrer sur l'aspect documentation des tests !
date: 10/02/2020
updated_at: 11/02/2020
published: true
beta: false
writing_time: 7
ahah: 2
reading_time: 14
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
    <li><a href="intro-tdd-swift-1-7-etapes">Introduction à TDD en Swift (Partie 1) - 7 étapes essentielles</a></li>
    <li><a href="intro-tdd-swift-2-typage-et-generalisation">Introduction à TDD en Swift (Partie 2) - Vive le typage et la généralisation</a></li>
    <li><strong>Introduction à TDD en Swift (Partie 3) - Une bonne documentation</strong></li>
  </ul>
</div>

Dans le [précédent article](intro-tdd-swift-2-typage-et-generalisation) de cette série tu as appris les bienfaits de la pratique de TDD :
- les tests sont fiables et nous permettent de ne rien casser,
- les tests nous poussent à raisoner plus profondément, à avoir un code plus robuste,
- les tests sont plus importants que le code de production.

Nous allons continuer aujourd'hui le kata [FizzBuzz](http://kata-log.rocks/fizz-buzz-kata) en implémentant plusieurs nouveaux tests en TDD.

Au programme :
- pourquoi une suite de tests doit constituer la meilleure documentation possible,
- je vais déroger au cycle RED-GREEN-REFACTOR (_crime crime !_ 😂),
- tu vas avoir un petit aperçu du property-based testing (_wat?_),
- et enfin on va utiliser le résultat d'un test pour écrire un test (_waaaat?_).

Alors, prêt(e) ?

<!--more-->

## Règle métier : "Pour les nombres non multiples de `3` ou `5`, affiche le nombre"

Je viens de me rendre compte que ma checklist ne reflète pas vraiment les règles métiers, je la mets donc à jour.

<table>
  <tr><td>Pour les nombres non multiples de <code>3</code> ou <code>5</code>, affiche le nombre</td></tr>
  <tr><td>3 -> [1, 2, Fizz]</td></tr>
  <tr><td>Pour les multiples de <code>3</code>, affiche <code>Fizz</code> au lieu du nombre</td></tr>
  <tr><td>5 -> last == Buzz</td></tr>
  <tr><td>Pour les multiples de <code>5</code>, affiche <code>Buzz</code> au lieu du nombre</td></tr>
  <tr><td>15 -> last == FizzBuzz</td></tr>
  <tr><td>Pour les multiples de <code>15</code>, affiche <code>FizzBuzz</code> au lieu du nombre</td></tr>
  <tr><td>Afficher les nombres de 1 à 100</td></tr>
</table>

Voilà aussi une belle illustration des bienfaits de TDD.

<p class="highlight">
  Pour écrire de bons tests, je dois capture <strong>fidèlement</strong> le besoin.
</p>

Mon envie d'avoir une bonne suite de tests, une bonne __documentation__ me pousse à me concentrer sur le besoin.

Souvent, en écrivant des tests, je me rends compte qu'il me manque des informations.

Je découvre des cas d'usage (des cas d'erreur la plupart du temps), pour lesquels j'ai besoin de questionner les utilisateurs & utilisatrices (ou le Product Owner).

Révisons nos deux derniers tests :
- `test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string`
- `test_FizzBuzz_up_to_2_is_a_list_containing_1_and_2_as_string`

Ce sont deux tests qui sont des exemples vérifiant la première règle métier : __"Pour les nombres non multiples de `3` ou `5`, affiche le nombre".__

Dans un soucis de __bonne documentation__ (je me répète mais c'est __important__ !), ces deux tests me dérangent car ils ne communiquent pas efficacement la règle métier.

Comment pourrions-nous nommer un test unique qui communique efficacement cette règle métier ?

...

...

...

> Hum, que penses-tu de `test_Numbers_not_multiple_of_3_or_5_are_displayed_as_is` ?

Ça me semble parfait, bien joué !

Quel serait le contenu de cette méthode de test ?

> Pourquoi pas ceci :

{% highlight swift %}
func test_Numbers_not_multiple_of_3_or_5_are_displayed_as_is() {
  assertThatFizzBuzz(upTo: 2, is: [ "1", "2" ])
}
{% endhighlight %}

Pas mal...

Le problème c'est qu'on ne gère que les nombres jusqu'à `2`.

C'est un test assez limité.

> Ok, alors ceci peut-être ?

{% highlight swift %}
func test_Numbers_not_multiple_of_3_or_5_are_displayed_as_is() {
  assertThatFizzBuzz(upTo: 10, is: [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ])
}
{% endhighlight %}

Là on teste jusqu'à `10`, c'est mieux ; le problème c'est que les prochaines règles métiers vont faire échouer ce test.

__Or on ne veut pas écrire de tests "faux".__

Il serait pertinent, dans un premier temps, de vérifier que certains nombres sont bien affichés tels quels.

Que penses-tu ce ceci ?

{% highlight swift %}
func test_Numbers_not_multiple_of_3_or_5_are_displayed_as_is() {
  assertThatFizzBuzz(upTo: 1, endsWith: "1")
  assertThatFizzBuzz(upTo: 2, endsWith: "2")
  assertThatFizzBuzz(upTo: 4, endsWith: "4")
  // ...
  assertThatFizzBuzz(upTo: 10213, endsWith: "10213")
}

private func assertThatFizzBuzz(upTo n: UInt, endsWith expected: String, line: UInt = #line) {
  let fizzBuzz = FizzBuzz()
  let result = fizzBuzz.upTo(n)
  XCTAssertEqual(expected, result.last, line: line)
}
{% endhighlight %}

> Mouais...ça va nous faire un test long comme le bras ça ! 😕
> Et tu ne vérifies pas que la liste retournée est bonne, juste le dernier élément.

Tu as raison...

Pour ta deuxième remarque j'ajoute un test à ma liste : __FizzBuzz jusqu'à un certain nombre retourne une liste de la taille de ce nombre__.

Concernant ta première remarque, nous pouvons généraliser en faisant une boucle avec nos exemples.

Comme ceci :

{% highlight swift %}
func test_Numbers_not_multiple_of_3_or_5_are_displayed_as_is() {
  let numbers: [UInt] = [ 1, 2, 4, 10213 ]
  for n in numbers {
    assertThatFizzBuzz(upTo: n, endsWith: "\(n)")
  }
}
{% endhighlight %}

> Excellent !

Oui ça me plaît assez...

Mais j'ai l'impression de réécrire l'algo dans mes tests !

En effet je transforme un nombre en `String` (`"\(n)"`) comme dans mon code de prod.

Ce n'est pas top car cela introduit de la duplication et du couplage entre les tests et le code de prod !

Modifions le test pour éviter cela :

{% highlight swift %}
func test_Numbers_not_multiple_of_3_or_5_are_displayed_as_is() {
  let expectations: [UInt: String] = [ 1: "1", 2: "2", 4: "4", 10213: "10213" ]
  for (n, expected) in expectations {
    assertThatFizzBuzz(upTo: n, endsWith: expected)
  }
}
{% endhighlight %}

Beaucoup mieux !

Passons maintenant au refactoring.

Je vois plusieurs duplications :
1. il y a des tests redondants,
2. il y a de la duplication dans les deux méthodes d'assertions.

Commençons par le premier point, on peut supprimer les tests suivants :
- `test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string`
- `test_FizzBuzz_up_to_2_is_a_list_containing_1_and_2_as_string`

Et enfin le deuxième, on crée une nouvelle méthode pour factoriser le code similaire dans nos deux assertions :

{% highlight swift %}
private func assertThatFizzBuzz(upTo n: UInt, is expected: [String], line: UInt = #line) {
  let result = fizzBuzz(upTo: n)
  XCTAssertEqual(expected, result, line: line)
}

private func assertThatFizzBuzz(upTo n: UInt, endsWith expected: String, line: UInt = #line) {
  let result = fizzBuzz(upTo: n)
  XCTAssertEqual(expected, result.last, line: line)
}

private func fizzBuzz(upTo n: UInt) -> [String] {
  let fizzBuzz = FizzBuzz()
  return fizzBuzz.upTo(n)
}
{% endhighlight %}

Done !

Le fait de tester le comportement de `FizzBuzz` avec des valeurs prédéfinies est une approche __basée sur l'exemple__.

Elle présente l'avantage d'être simple à mettre en œuvre et suffit la plupart du temps.

L'inconvénient est que sur certains algorithmes, nous pouvons difficilement couvrir tous les exemples efficacement. Un de ces algorithmes est celui du kata [Roman Numerals](http://kata-log.rocks/roman-numerals-kata) où il faut transformer des nombres romains en nombres arabes.

Autre inconvénient : cette approche n'offre pas de "preuve" au sens mathématique. Nos tests prouvent uniquement que notre programme fonctionne pour les exemples choisis.

_Pour aller plus loin_, tu peux aller fouiller du côté de l'approche basée sur les propriétés : le __property-based testing__. Pour cela, nous utilisons notamment des outils comme [SwiftCheck](https://github.com/typelift/SwiftCheck). Je prévois de réviser `FizzBuzz` en utilisant SwiftCheck dans un prochain article, pour ne pas le manquer, [inscris-toi à la newsletter !](signup)

## Propriété : la taille de la liste

J'ai ajouté à ma liste le test suivant : __FizzBuzz jusqu'à un certain nombre retourne une liste de la taille de ce nombre__.

Il est maintenant temps de l'implémenter !

{% highlight swift %}
func test_Result_list_is_of_the_same_size_as_requested_upper_bound() {
  let fizzBuzz = FizzBuzz()
  let result = fizzBuzz.upTo(0)
  XCTAssertEqual(0, result.count)
}
{% endhighlight %}

Là nous gérons le cas `0`, allons plus loin en restant dans l'approche par l'exemple pour tester jusqu'à 100.

{% highlight swift %}
func test_Result_list_is_of_the_same_size_as_requested_upper_bound() {
  let fizzBuzz = FizzBuzz()
  for n in 0...100 {
    let result = fizzBuzz.upTo(UInt(n))
    XCTAssertEqual(n, result.count)
  }
}
{% endhighlight %}

> J'ai quand même une interrogation par rapport à TDD...

Je t'écoute.

> En écrivant ce test, nous ne sommes pas passés par la phase __RED__. C'est encore du TDD du coup ?

Très bonne remarque !

Pourquoi est-il utile de passer par la phase __RED__ ?

> Pour vérifier que notre test est utile et s'assurer que son échec donne assez d'informations pour nous aider à le faire passer à nouveau.

Exactement !

Je prends le risque ici d'écrire un test inutile et je ne vérifie pas les informations liées à son éventuel échec.

Les tests servent à vérifier la non-régression et à guider la conception.

Ils servent aussi de __documentation des comportements attendus__ !

Je souhaite spécifier les comportements attendus ! Un des comportements que j'attends est que `FizzBuzz` me retourne une bonne liste de `String` donc il me faut un test pour le spécifier.

Cela suffit à justifier l'utilité de ce test.

Concernant le message d'erreur, je peux forcer l'échec de ce test en modifiant le code de production comme ceci :

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  if n == 0 { return [] }
  return [ "\(n)" ]
}
{% endhighlight %}

J'obtiens 98 erreurs de la forme : `-[TDDFizzBuzzTests.FizzBuzz_Spec test_Result_list_is_of_the_same_size_as_requested_upper_bound] : XCTAssertEqual failed: ("2") is not equal to ("1")`.

Je peux facilement déduire, à partir du nom du test et du message, que le problème se situe au niveau de la taille de la liste.

Remettons le code de production en état pour refaire passer le test :

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  return (0...n).dropFirst(1).map { "\($0)" }
}
{% endhighlight %}

<p class="highlight">
Ce n'est pas parcequ'un test ne nous fait pas écrire du code de prod qu'il est inutile. Un test est là pour <strong>spécifier un comportement</strong> et sert à la <strong>documentation du code</strong>.
</p>

## Deuxième règle métier : les multiples de 3 donnent "Fizz"

Au regard des tests existants, j'ai mis à jour ma liste :

<table>
  <tr><td>Pour les multiples de <code>3</code>, affiche <code>Fizz</code> au lieu du nombre</td></tr>
  <tr><td>Pour les multiples de <code>5</code>, affiche <code>Buzz</code> au lieu du nombre</td></tr>
  <tr><td>Pour les multiples de <code>15</code>, affiche <code>FizzBuzz</code> au lieu du nombre</td></tr>
  <tr><td>Afficher les nombres de 1 à 100</td></tr>
</table>

J'ai supprimé des exemples comme "3 -> [1, 2, Fizz]" car ils n'apportent rien en terme de documentation.

J'accélère en passant directement aux règles métiers.

C'est parti pour le test de notre deuxième règle métier :

{% highlight swift %}
func test_Multiples_of_3_are_displayed_as_Fizz() {
  let examples: [UInt] = [ 3, 6, 9, 12, 18, 3 * 123 ]
  for n in examples {
    assertThatFizzBuzz(upTo: n, endsWith: "Fizz")
  }
}
{% endhighlight %}

_Nous pourrions y aller par plus petites étapes en testant d'abord `3`, puis `6`, etc. Mais je me sens en confiance pour accélérer un peu. Je sais que si jamais je n'y arrive pas, je pourrais ralentir._

Je vais en __GREEN__ le plus vite possible :

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  return (0...n).dropFirst(1).map {
    if $0 % 3 == 0 {
      return "Fizz"
    }

    return "\($0)"
  }
}
{% endhighlight %}

Et je passe au __REFACTORING__.

La méthode `upTo` commence à devenir assez longue, c'est le smell [Long Method](https://refactoring.guru/smells/long-method).

Comme _traitement_ j'utilise [Extract Method](https://refactoring.guru/extract-method).

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  return (0...n).dropFirst(1).map(stringFor)
}

private func stringFor(_ n: UInt) -> String {
  if n % 3 == 0 {
    return "Fizz"
  }

  return "\(n)"
}
{% endhighlight %}

J'aimerai aussi rendre plus explicite la condition pour vraiment faire ressortir la règle métier "multiple de 3".

On pourrait ajouter un _commentaire_ au dessus du `if` mais [les commentaires sont le signe que le code peut être amélioré](https://refactoring.guru/smells/comments).

Là aussi, un [Extract Method](https://refactoring.guru/extract-method) à la rescousse !

{% highlight swift %}
private func stringFor(_ n: UInt) -> String {
  if isMultipleOf3(n) {
    return "Fizz"
  }

  return "\(n)"
}

private func isMultipleOf3(_ n: UInt) -> Bool {
  return n % 3 == 0
}
{% endhighlight %}

Je pense encore pouvoir amélioré la lisibilité du code en utilisant une super feature de Swift : les extensions !

{% highlight swift %}
struct FizzBuzz {

  // ...

  private func stringFor(_ n: UInt) -> String {
    if n.isMultipleOf3 {
      return "Fizz"
    }

    return "\(n)"
  }
}

extension UInt {  

  var isMultipleOf3: Bool {
    return self % 3 == 0
  }
}
{% endhighlight %}

Là je suis content ! Passons au test suivant !

## Troisième règle métier : les multiples de 5 donnent "Buzz"

<table>
  <tr><td>Pour les multiples de <code>5</code>, affiche <code>Buzz</code> au lieu du nombre</td></tr>
  <tr><td>Pour les multiples de <code>15</code>, affiche <code>FizzBuzz</code> au lieu du nombre</td></tr>
  <tr><td>Afficher les nombres de 1 à 100</td></tr>
</table>

Le test :

{% highlight swift %}
func test_Multiples_of_5_are_displayed_as_Buzz() {
  let examples: [UInt] = [ 5, 10, 20, 25, 35, 5 * 124 ]
  for n in examples {
    assertThatFizzBuzz(upTo: n, endsWith: "Buzz")
  }
}
{% endhighlight %}

__RED__ !

Je le fais passer :

{% highlight swift %}
private func stringFor(_ n: UInt) -> String {
  if n.isMultipleOf3 {
    return "Fizz"
  }

  if n % 5 == 0 {
    return "Buzz"
  }

  return "\(n)"
}
{% endhighlight %}

__GREEN__ !

Et maintenant __REFACTORING__ !

D'abord le code de prod :

{% highlight swift %}
struct FizzBuzz {

  // ...

  private func stringFor(_ n: UInt) -> String {
    if n.isMultipleOf3 { return "Fizz" }
    if n.isMultipleOf5 { return "Buzz" }
    return "\(n)"
  }
}

extension UInt {

  // ...

  var isMultipleOf5: Bool {
    return self % 5 == 0
  }
}
{% endhighlight %}

Et enfin les tests, car je vois un pattern qui se répète :
- une liste d'exemples,
- je parcours la liste,
- pour chaque élément je vérifie que le résultat termine par une `string` donnée.

Voilà ce que ça donne :

{% highlight swift %}
func test_Multiples_of_3_are_displayed_as_Fizz() {
  assertThatAllFizzBuzzUpTo([ 3, 6, 9, 12, 18, UInt(3 * 123) ], endsWith: "Fizz")
}

func test_Multiples_of_5_are_displayed_as_Buzz() {
  assertThatAllFizzBuzzUpTo([ 5, 10, 20, 25, 35, UInt(5 * 124) ], endsWith: "Buzz")
}

private func assertThatAllFizzBuzzUpTo(_ examples: [UInt], endsWith expected: String, line: UInt = #line) {
  for n in examples {
    assertThatFizzBuzz(upTo: n, endsWith: expected, line: line)
  }
}
{% endhighlight %}

## Dernière règle métier : les multiples de 3 et 5 donnent "FizzBuzz"

<table>
  <tr><td>Pour les multiples de <code>15</code>, affiche <code>FizzBuzz</code> au lieu du nombre</td></tr>
  <tr><td>Afficher les nombres de 1 à 100</td></tr>
</table>

> Nous y sommes presque !

Ouiii !! Mais ne crions pas victoire trop vite, il nous reste 2 tests à implémenter.

Commençons avec notre dernière règle métier.

{% highlight swift %}
func test_Multiples_of_3_and_5_are_displayed_as_FizzBuzz() {
  assertThatAllFizzBuzzUpTo([ 15, 30, 45, 60, 75, 90, UInt(3 * 5 * 125) ], endsWith: "FizzBuzz")
}
{% endhighlight %}

En route pour __GREEN__ !

{% highlight swift %}
private func stringFor(_ n: UInt) -> String {
  if n.isMultipleOf3 { return "Fizz" }
  if n.isMultipleOf5 { return "Buzz" }
  if n.isMultipleOf3 && n.isMultipleOf5 { return "FizzBuzz" }
  return "\(n)"
}
{% endhighlight %}

❌ __FAIL__

Oups, quoi ?

> Héhé, il faut mettre le troisème `if` avant les deux autres !

Ah mais oui, suis-je bête ? Merci !

_Heureusement qu'il y a les tests quand j'ai un coup de mou !_

Comme ça c'est mieux :

{% highlight swift %}
private func stringFor(_ n: UInt) -> String {
  if n.isMultipleOf3 && n.isMultipleOf5 { return "FizzBuzz" }
  if n.isMultipleOf3 { return "Fizz" }
  if n.isMultipleOf5 { return "Buzz" }
  return "\(n)"
}
{% endhighlight %}

__REFACTORING__ !

Je trouve qu'il y a deux tests qui ne sont pas assez explicites.

`test_Multiples_of_3_are_displayed_as_Fizz` et `test_Multiples_of_5_are_displayed_as_Buzz`.

En effet, je m'attends à voir des multiples de 3 dans le premier, or je ne vois pas 15, on passe de 12 à 18.

Et je m'attends à voir des multiples de 5 dans le deuxième, or je ne vois pas 15 non plus, on passe de 10 à 20.

Le nom des tests ne reflète pas __exactement__ le besoin, il faut donc les renommer.

Comme ceci :

{% highlight swift %}
func test_Multiples_of_3_but_not_5_are_displayed_as_Fizz() {
  // ...
}

func test_Multiples_of_5_but_not_3_are_displayed_as_Buzz() {
  // ...
}
{% endhighlight %}

## Test d'acceptance : FizzBuzz de 1 à 100

<table>
  <tr><td>Afficher les nombres de 1 à 100</td></tr>
</table>

Bon, je ne sais pas toi mais écrire les valeurs d'exemples pour ce test à la main m'ennuie.

Tu as confiance dans nos tests ?

> Oui !

Et si on laissait ce dernier test échouer en nous donnant les valeurs ?

Ensuite on n'aura plus qu'à copier le resultat donnée par le test dans notre test et le tour est joué !

> Genius ! 🤯

{% highlight swift %}
func test_Print_numbers_from_1_to_100() {
  assertThatFizzBuzz(upTo: 100, is: [])
}
{% endhighlight %}

❌ __FAIL__

Yeah ! Haha ! J'ai beaucoup trop de fun à faire ça. 🤣

Et je copie les valeurs dans mon test :

{% highlight swift %}
func test_Print_numbers_from_1_to_100() {
  assertThatFizzBuzz(upTo: 100, is: [ "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz", "19", "Buzz", "Fizz", "22", "23", "Fizz", "Buzz", "26", "Fizz", "28", "29", "FizzBuzz", "31", "32", "Fizz", "34", "Buzz", "Fizz", "37", "38", "Fizz", "Buzz", "41", "Fizz", "43", "44", "FizzBuzz", "46", "47", "Fizz", "49", "Buzz", "Fizz", "52", "53", "Fizz", "Buzz", "56", "Fizz", "58", "59", "FizzBuzz", "61", "62", "Fizz", "64", "Buzz", "Fizz", "67", "68", "Fizz", "Buzz", "71", "Fizz", "73", "74", "FizzBuzz", "76", "77", "Fizz", "79", "Buzz", "Fizz", "82", "83", "Fizz", "Buzz", "86", "Fizz", "88", "89", "FizzBuzz", "91", "92", "Fizz", "94", "Buzz", "Fizz", "97", "98", "Fizz", "Buzz" ])
}
{% endhighlight %}

✅ __SUCCESS__

Tadaaaa ! 🎉

## Conclusion

Voilà qui achève cette belle introduction à TDD en Swift.

J'espère que cela t'a aidé à apprécier cette pratique qui change mon quotidien depuis 2016 et qui m'apporte une grande sérénité.

Tu as appris dans ce dernier article que :
- pour écrire de bons tests, il faut capturer __fidèlement__ le besoin,
- ce n'est pas parcequ'un test ne nous fait pas écrire du code de prod qu'il est inutile,
- un test est avant tout là pour __spécifier un comportement__ et sert à la __documentation du code__.

Si tu veux __aller plus loin et plus vite__ dans ta maîtrise de cette pratique tu peux [faire appel à moi directement](mailto:{{ site.author_email }}?subject={{ "J'aimerais être accompagné en TDD" | escape_once }}) !

Pour télécharger le projet finalisé, [c'est par ici !](tdd-intro-resources/code/TDDFizzBuzz-Final.zip)

Si tu as apprécié cette série sur TDD, n'hésite pas à t'inscrire à la newsletter ci-dessous pour ne rien manquer des prochains articles. 👇
