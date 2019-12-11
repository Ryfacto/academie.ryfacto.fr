---
layout: article
image:
title: Introduction à TDD en Swift (Partie 2) - Vive le typage et la généralisation
description: Continue avec moi le premier exemple FizzBuzz. Découvre la puissance du système de type de Swift ainsi qu'une propriété intéressante des bons tests !
date: 14/08/2019
updated_at: 14/08/2019
published: false
beta: true
writing_time: 4
ahah: 3
reading_time: 9
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
    <li><strong>Introduction à TDD en Swift (Partie 2) - Vive le typage et la généralisation</strong></li>
    <li class="coming-soon">Introduction à TDD en Swift (Partie 3) - Une bonne documentation <em>(bientôt dispo)</em></li>
  </ul>
</div>

INTRO HERE

<!--more-->

## Et le cycle recommence !

### FizzBuzz "jusqu'à 0"

Modifie __FizzBuzz_Spec.swift__ pour y ajouter ce test :

{% highlight swift %}
func test_FizzBuzz_up_to_0_is_an_empty_list() {
  let fizzBuzz = FizzBuzz()
  let result = fizzBuzz.upTo(0)
  let expected: [String] = []
  XCTAssertEqual(expected, result)
}
{% endhighlight %}

Lance les tests. Erreur de compilation !

Ajoute la méthode `upTo` à `FizzBuzz`.

{% highlight swift %}
func upTo(_ n: Int) -> [String] {
  fatalError("upTo(n:) has not been implemented")
}
{% endhighlight %}

Relance les tests. Échec à nouveau, quelle tristesse !

Non, un test qui échoue c'est du progrès !

Aller, on ne se décourage pas, on fait passer le test le plus vite possible !

Met à jour la méthode `upTo` :

{% highlight swift %}
func upTo(_ n: Int) -> [String] {
  return []
}
{% endhighlight %}

Et relance les tests une nouvelle fois (tu comprends maintenant pourquoi ils doivent être rapide !).

Ils passent !

> Youpi ! Test suivant !

Hum hum...

> ...je voulais dire : refactoring !

Ah ! Je préfère ça !

> Quels crimes avons-nous commis ?

J'allais te le demander !

> Je regarde le code dans `FizzBuzz`, ça m'a l'air très bien, je ne vois pas quoi améliorer...

Et dans les tests ?

> Quoi ? On doit aussi refactorer les tests ?

Et comment ! C'est encore plus important que le code de production !

Les tests sont-ils bien conçus selon toi ?

Y'a-t-il de la duplication ?

...

...

...

> Oh c'est difficile, je ne sais pas !

Ok ok je vais t'aider !

Il y a un test qui est devenu inutile...

...notre test "marche-pied" !

Tu peux donc le supprimer, il s'agit de la méthode `test_Creation`. _Whoop! Supprimée!_

> Ensuite on met à jour la liste !

Extact !

<table>
  <tr><td>-1 -> []</td></tr>
  <tr><td>1 -> [1]</td></tr>
  <tr><td>3 -> [1, 2, Fizz]</td></tr>
  <tr><td>5 -> last == Buzz</td></tr>
  <tr><td>15 -> last == FizzBuzz</td></tr>
  <tr><td>100 -> [1, 2, Fizz, 4, Buzz, Fizz, ... ]</td></tr>
</table>

### FizzBuzz "jusqu'à -1"

Je me pose la question si je dois réellement écrire un test pour celui-ci.

Ne pourrais-je pas gérer ce cas marginal autrement ?

À ton avis ?

...

...

...

> Le compilateur ! On met un `UInt` au lieu d'un `Int` pour le paramètre `n` !

Euréka ! Très bonne idée !

Modifie la méthode `upTo` comme ceci :

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  return []
}
{% endhighlight %}

Relance les tests pour être sûr.

Ça marche toujours !

On vient de s'épargner un test, donc du code à maintenir, génial ! Merci le système de type !

<table>
  <tr><td>1 -> [1]</td></tr>
  <tr><td>3 -> [1, 2, Fizz]</td></tr>
  <tr><td>5 -> last == Buzz</td></tr>
  <tr><td>15 -> last == FizzBuzz</td></tr>
  <tr><td>100 -> [1, 2, Fizz, 4, Buzz, Fizz, ... ]</td></tr>
</table>

### FizzBuzz "jusqu'à 1"

Ajoute le test suivant :

{% highlight swift %}
func test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string() {
  let fizzBuzz = FizzBuzz()
  let result = fizzBuzz.upTo(1)
  let expected = [ "1" ]
  XCTAssertEqual(expected, result)
}
{% endhighlight %}

Lance les tests. Le dernier échoue !

Modifie le code pour le faire passer :

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  if n == 0 {
    return []
  }

  return [ "1" ]
}
{% endhighlight %}

Relance les tests. Ils passent !

> REFACTORING !!!

WOW! Oui c'est ça haha !

> Y'a une duplication ! C'est pô bien !

Effectivement, le `"1"` est dupliqué !

Il est présent dans le code de test, et dans le code de production.

Nous sommes donc forcés de le supprimer à un des deux endroits et de le remplacer par autre chose sans rien casser.

Nous allons __généraliser__ le code de production pour supprimer la duplication sans rien casser.

> Comment ça "généraliser" ?

Généraliser revient à supprimer ce qui est spécifique, ici `"1"` en utilisant des variables.

Quelle variable peux-tu utiliser dans ce cas précis pour remplacer `"1"` dans la méthode `upTo` ?

...

...

...

> `n` !

C'est ça ! Modifie le code de `upTo` comme ceci :

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  if n == 0 {
    return []
  }

  return [ "\(n)" ]
}
{% endhighlight %}

Relance les tests. Ils passent toujours !

Ceci est très intéressant et illustre une des propriétés des __bons tests__.

<p class="highlight">
  Au fur et à mesure que les tests deviennent <strong>spécifiques</strong>, le code de production devient <strong>générique</strong>.
</p>

Il y a encore de la duplication, mais dans les tests cette fois.

Simplifions les grâce à trois refactorings : [_extract variable_](https://refactoring.guru/extract-variable), [_extract method_](https://refactoring.guru/extract-method) et [_inline temp_](https://refactoring.guru/inline-temp).

Premièrement fais un _extract variable_ des paramètres en entrée de `upTo` dans les deux tests :

{% highlight swift %}
func test_FizzBuzz_up_to_0_is_an_empty_list() {
  // ...
  let input: UInt = 0
  let result = fizzBuzz.upTo(input)
  // ...
}

func test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string() {
  // ...
  let input: UInt = 1
  let result = fizzBuzz.upTo(input)
  // ...
}
{% endhighlight %}

Ensuite, fais remonter les variables `input` et `expected` en haut de chaque méthode de test :

{% highlight swift %}
func test_FizzBuzz_up_to_0_is_an_empty_list() {
  let input: UInt = 0
  let expected: [String] = []
  // ...
}

func test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string() {
  let input: UInt = 1
  let expected = [ "1" ]
  // ...
}
{% endhighlight %}

Et enfin un _extract method_ des trois dernières lignes :

{% highlight swift %}
func test_FizzBuzz_up_to_0_is_an_empty_list() {
  let input: UInt = 0
  let expected: [String] = []
  assertThatFizzBuzz(upTo: input, is: expected)
}

func test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string() {
  let input: UInt = 1
  let expected = [ "1" ]
  assertThatFizzBuzz(upTo: input, is: expected)
}

// 1.
private func assertThatFizzBuzz(upTo n: UInt, is expected: [String], line: UInt = #line) {
  let fizzBuzz = FizzBuzz()
  let result = fizzBuzz.upTo(n)
  XCTAssertEqual(expected, result, line: line)
}
{% endhighlight %}

1. Tu noteras que j'ai ajouté un paramètre `line`, avec la valeur spéciale `#line`. Cela permet d'indiquer à Xcode à quelle ligne aller lorsque l'assertion échoue et que l'on clique sur le test qui a échoué. Sans ce paramètre, Xcode nous emmènerait dans la méthode `assertThatFizzBuzz...` et on devrait aller nous-même dans le code appelant la méthode. Ce qui est très ennuyeux !

Et enfin, ultime étape, tu peux _inline temp_ les variables `input` & `expected` :

{% highlight swift %}
func test_FizzBuzz_up_to_0_is_an_empty_list() {
  assertThatFizzBuzz(upTo: 0, is: [])
}

func test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string() {
  assertThatFizzBuzz(upTo: 1, is: [ "1" ])
}

private func assertThatFizzBuzz(upTo n: UInt, is expected: [String], line: UInt = #line) {
  let fizzBuzz = FizzBuzz()
  let result = fizzBuzz.upTo(n)
  XCTAssertEqual(expected, result, line: line)
}
{% endhighlight %}

Un petit run des tests pour vérifier qu'on n'a rien cassé au passage...

...et ça marche ! Merveilleux !

### FizzBuzz "jusqu'à 2"

Je viens de penser à un nouveau test.

Un test qui nous obligera à boucler : FizzBuzz jusqu'à 2 !

Je l'ajoute en haut de la liste :

<table>
  <tr><td>2 -> [1, 2]</td></tr>
  <tr><td>3 -> [1, 2, Fizz]</td></tr>
  <tr><td>5 -> last == Buzz</td></tr>
  <tr><td>15 -> last == FizzBuzz</td></tr>
  <tr><td>100 -> [1, 2, Fizz, 4, Buzz, Fizz, ... ]</td></tr>
</table>

Ajoute le test suivant :

{% highlight swift %}
func test_FizzBuzz_up_to_2_is_a_list_containing_1_and_2_as_string() {
  assertThatFizzBuzz(upTo: 2, is: [ "1", "2" ])
}
{% endhighlight %}

Grâce aux refactorings d'avant, ce test a été très simple à écrire !

De plus, il est on ne peut plus parlant et clair.

> Toujours prendre soin de ses tests hein ?

Toujours ! 👍

> On le fait passer ?

Avec plaisir ! Mais comment ?

...

...

...

> Comme ça !

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  if n == 0 {
    return []
  }

  if n == 2 {
    return [ "1", "\(n)" ]
  }

  return [ "\(n)" ]
}
{% endhighlight %}

Bien joué ! Le problème c'est que ce n'est pas très propre...

> C'est pour ça que la phase de Refactoring existe !

😢 Je suis si fier de toi !

> Supprimons les duplications en généralisant. Le `"1"` peut devenir `"\(n-1)"` dans un premier temps.

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  if n == 0 {
    return []
  }

  if n == 2 {
    return [ "\(n-1)", "\(n)" ]
  }

  return [ "\(n)" ]
}
{% endhighlight %}

Hum...je vois un schéma qui se répète grâce à ce refactoring.

Ça m'a tout l'air d'être un bon candidat pour une boucle.

__En plus, une boucle est la généralisation d'un if !__

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  if n == 0 {
    return []
  }

  var result: [String] = []

  for i in (1...n) {
    result.append("\(i)")
  }

  return result
}
{% endhighlight %}

Déjà mieux !

> On peut le faire en plus "prog fonctionnelle" please ? 🤗

Oh oui, ce `var` me dérange aussi, mais comment ?

> `map` !

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  if n == 0 {
    return []
  }

  return (1...n).map { "\($0)" }
}
{% endhighlight %}

> Woohoo ! 🎉

Je me demande...Est-ce que le premier `if` est toujours nécessaire ?

> On peut regarder la doc de `map` sur les `ClosedRange` pour vérifier ?

Trop long ! Je vais simplement virer ce `if` et vérifier si mes tests passent toujours !

> Ah ouais pas bête... 😅

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {    
  return (1...n).map { "\($0)" }
}
{% endhighlight %}

❌ __FAIL__

Oups, ça ne marche pas !

> Au moins nous avons pu vérifier en un rien de temps !

Oui, c'est ce qui est intéressant avec de bons tests, on peut vérifier nos idées rapidement !

Continuons...

Le test échoue avec l'erreur suivante : `Fatal error: Can't form Range with upperBound < lowerBound`

Effectivement, j'essaye de créer un `Range` avec `n = 0` soit `(1...0)` et ce n'est pas possible.

Et si je mettais `(0...n)` plutôt ?

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  return (0...n).map { "\($0)" }
}
{% endhighlight %}

❌ __FAIL__

> Tous les tests échouent !

Effectivement, mais les erreurs sont claires :
- `XCTAssertEqual failed: ("[]") is not equal to ("["0"]")`
- `XCTAssertEqual failed: ("["1"]") is not equal to ("["0", "1"]")`
- `XCTAssertEqual failed: ("["1", "2"]") is not equal to ("["0", "1", "2"]")`

Un magnifique `"0"` est ajouté.

Cela est dû au fait que mon range démarre par `0`.

Et si j'ignorais simplement le premier élément de mon range ?

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  return (0...n).dropFirst(1).map { "\($0)" }
}
{% endhighlight %}

✅ __SUCCESS__

Aaaah voilà qui est mieux !

> Une ligne de code, waouh !

Et tout ça grâce aux tests qui vérifient la non-régression !

## Conclusion

TODO
