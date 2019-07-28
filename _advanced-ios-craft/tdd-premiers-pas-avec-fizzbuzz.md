---
layout: article
image:
title: Test-Driven Development - Premiers pas avec FizzBuzz
description: aa
date: 13/07/2019
updated_at: 13/07/2019
published: true
beta: true
writing_time: 1
ahah: 1
technical_environment:
  swift: 5
  ios: 12.2
  xcode: 10.2.1
  appcode: 2019.1.4
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

> Pourquoi commencer par les tests les plus simples et ceux à la marge ?

Très bonne question !

Si je commence par les tests concernant les règles métiers, je risque de me retrouver bloquer.

Je risque de devoir implémenter tout l'algo, ou une grosse partie, d'un coup !

Dans un prochain article, je te montrerai un exemple qui illustre un blocage si on ne priorise pas correctement. Pour ne pas le rater, [inscris-toi à la newsletter !](signup)

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

Fais passer le test en créant une `struct` __FizzBuzz__ juste au-dessus de la classe de test dans le fichier __FizzBuzz_Spec.swift__.

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

Résumons :
- étape 1 : je crée ou mets à jour la liste des __comportements attendus__,
- étape 2 : j'ordonne la liste en commençant par les tests les plus simples (ceux qui me feront écrire le moins de code) ainsi que les cas à la marge ; pour éviter de me retrouver bloquer,
- étape 3 : je fais juste assez de conception pour m'aider à écrire les tests, et surtout le premier,
- étape 4 : j'écris le premier test en utilisant du code qui n'existe pas, c'est la phase __RED__,
- étape 5 : je fais passer le test sans me préoccuper des horreurs de conception que je fais, c'est la phase __GREEN__,
- étape 6 : je nettoie les dites horreurs, c'est la phase __REFACTORING__,
- étape 7 : je mets à jour ma liste et je recommence tant qu'elle n'est pas vide !

> Pourquoi ne pas écrire directement du code bien conçu ?

Certains pratiquants du TDD le font.

Il m'arrive aussi de le faire de temps en temps.

Il faut cependant avoir conscience que vouloir _"faire correctement tout de suite"_ c'est prendre le risque de faire de la sur-ingénierie, d'écrire du code au cas où, du code qui n'est pas requis par un test qui échoue.

Et puis, c'est plus difficile de faire _bien_ tout de suite.

J'aime bien cette idée d'aller très vite en __GREEN__ sans se préoccuper de la conception.

Puis dans la phase de __REFACTORING__ prendre du recul, de la hauteur et vraiment me concentrer sur la bonne conception.

Si tu débutes en TDD, je t'encourage vivement à y aller doucement.

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

### Règle métier : "Pour les nombres non multiples de `3` ou `5`, affiche le nombre"

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

Je découvre des cas d'usages (des cas d'erreurs la plupart du temps), pour lesquels j'ai besoin de questionner les utilisateurs & utilisatrices (ou le Product Owner).

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

> Mais...?

Mais j'ai l'impression de réécrire l'algo dans mes tests !

> Et...c'est grave ça ?

Oui car cela introduit de la duplication et du couplage entre les tests et le code de prod !

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

Commençons par le 1., on peut supprimer les tests suivants :
- `test_FizzBuzz_up_to_1_is_a_list_containing_1_as_string`
- `test_FizzBuzz_up_to_2_is_a_list_containing_1_and_2_as_string`

Et enfin le 2., on crée une nouvelle méthode pour factoriser le code similaire dans nos deux assertions :

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

### Propriété : la taille de la liste

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

> Pour vérifier que notre test est utile et s'assurer que son échec donne assez d'informations pour nous aider à régler l'éventuel problème.

Exactement !

Je prends le risque ici d'écrire un test inutile et je ne vérifie pas les informations liées à son éventuel échec.

Et à quoi servent les tests ?

> À vérifier la non-régression et à guider la conception.

Mais encore...?

> Heu...ah oui ! Les tests servent de __documentation des comportements attendus__ !

Tout à fait !

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

Je peux facilement déduire, à partir du nom du test et du message, que le problème ce situe au niveau de la taille de la liste.

Remettons le code de production en état pour refaire passer le test :

{% highlight swift %}
func upTo(_ n: UInt) -> [String] {
  return (0...n).dropFirst(1).map { "\($0)" }
}
{% endhighlight %}

<p class="highlight">
Ce n'est pas parcequ'un test ne nous fait pas écrire du code de prod qu'il est inutile. Un test est là pour <strong>spécifier un comportement</strong> et sert à la <strong>documentation du code</strong>.
</p>

### Deuxième règle métier : les multiples de 3 donnent "Fizz"

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

> REFACTORING !

La méthode `upTo` commence à devenir assez longue, c'est le smell [Long Method](https://refactoring.guru/smells/long-method).

Quel est le _traitement_ ?

> C'est [Extract Method](https://refactoring.guru/extract-method) !

Tout juste !

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

### Troisième règle métier : les multiples de 5 donnent "Buzz"

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

__RED__ ! Je le fais passer :

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

### Dernière règle métier : les multiples de 3 et 5 donnent "FizzBuzz"

<table>
  <tr><td>Pour les multiples de <code>15</code>, affiche <code>FizzBuzz</code> au lieu du nombre</td></tr>
  <tr><td>Afficher les nombres de 1 à 100</td></tr>
</table>

> Nous y sommes presques !

Ouiii !! Mais ne crions pas victoire trop vite, il nous reste 2 testes à implémenter.

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

Comme ça c'est mieux !

{% highlight swift %}
private func stringFor(_ n: UInt) -> String {
  if n.isMultipleOf3 && n.isMultipleOf5 { return "FizzBuzz" }
  if n.isMultipleOf3 { return "Fizz" }
  if n.isMultipleOf5 { return "Buzz" }
  return "\(n)"
}
{% endhighlight %}

Refactoring !

> Hum...je ne vois rien à refactor...

Je trouve qu'il y a deux tests qui ne sont pas assez explicites.

> Ah ? Lesquels ?

`test_Multiples_of_3_are_displayed_as_Fizz` et `test_Multiples_of_5_are_displayed_as_Buzz`.

> Pourquoi ?

Je m'attends à voir des multiples de 3 dans le premier, or je ne vois pas 15, on passe de 12 à 18.

Et je m'attends à voir des multiples de 5 dans le deuxième, or je ne vois pas 15 non plus, on passe de 10 à 20.

Le nom des tests ne reflète pas __exactement__ le besoin, il faut donc les renommer.

> Comme ça par exemple ?

{% highlight swift %}
func test_Multiples_of_3_but_not_5_are_displayed_as_Fizz() {
  // ...
}

func test_Multiples_of_5_but_not_3_are_displayed_as_Buzz() {
  // ...
}
{% endhighlight %}

Tout à fait ! 👍

### Test d'acceptance : FizzBuzz de 1 à 100

<table>
  <tr><td>Afficher les nombres de 1 à 100</td></tr>
</table>

Bon, je ne sais pas toi mais écrire les valeurs d'exemples pour ce test à la main m'ennuie.

Tu as confiance dans nos tests ?

> Oui !

Et si on laissait ce dernier test échouer en nous donnant les valeurs ?

Ensuite on aura plus qu'à copier le resultat donnée par le test dans notre test et le tour est joué !

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

## Pour aller plus loin
