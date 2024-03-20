**Tests Généraux (22)**

1. Cliquer sur le bouton ''start quiz'' sans avoir remplit au moins un des champs lance une window.alert
2. Cliquer sur le bouton ''Edit Questions'' amène à l'écran pour modifier les questions
3. Si aucune catégorie n'est sélectionnée, le leaderboard reste vide et un mesage prévient l'usager de la raison
4. Si une catégorie est sélectionnée le leaderboard s'affiche pour cette catégorie
5. Si une catégorie est sélectionnée mais qu'aucun high score n'est disponible pour le moment pour cette dernière,
un message s'affiche pour prévenir l'usager.
6. Choisir une catégorie différente de la précédente met à jour le leaderboard en accordance avec l'action.
7. Si tout les champs sont remplis et que l'utilisateur clique sur ''Start Quiz'', l'écran du quiz apparaît et le quiz est lancé. 
8. Sur l'écran de quiz, un décompte est affiché selon ce qui avait été sélectionné par l'utilisateur. 
9. Sur l'écran de quiz, le décompte diminue d'une seconde à chaque seconde.
10. Si toutes les réponses ont été répondues avant la fin du décompte, une div s'affiche avec les bonnes réponses indiquant où l'utilisateur à eu bon ou non.
11. Après avoir gagné (ou perdu), un bouton s'affiche permettant de recommencer un quiz
12. Appuyer sur le bouton ''restart quiz'' ramène l'utilisateur à la page principale.
13. Lorsque le décompte arrive à 0, quelque chose prévient l'utilisateur qu'iel a perdu.
14. Lorsque l'utilisateur revient à l'écran principal, le leaderboard a été mis à jour avec les nouvelles données du jeu qui vient de s'écouler.
15. Depuis l'écran de modification des questions, cliquer sur ''Back'' retourne l'utilisateur sur la page principale. 
16. Depuis l'écran de modification des questions, cliquer sur ''Add a question'' sans n'avoir rien rempli prévient l'utilisateur de remplir les champs et la question n'est pas enregistrée.
17. Depuis l'écran de modification des questions, cliquer sur ''Add choice'' fait apparaître un nouveau champs d'input ''Choice'' 
18. Si on choisit une ''bonne réponse'' qui n'est pas dans les choix de réponse, un message prévient l'utilisateur et la question n'est pas enregistrée.
19. Ajouter une question valide affiche une alerte à l'utilisateur l'informant du succès de la manoeuvre et remet le formulaire d'ajout à son état initial.
20. L'ajout valide d'une question ajoute cette dernière au bas de la liste.
21. Cliquer sur le bouton ''delete'' d'une question affiche une alerte de confirmation à l'utilisateur, et s'iel appuie sur  ''ok'', la question est supprimée de la liste.
22. L'ajout valide d'une question permet, lorsqu'on retourne à la page principale et qu'on démarre un nouveau quiz, d'avoir cette question dans le nouveau poll.
23. Modifier une question puis cliquer sur ''save questions'' persiste bel et bien le changement.
24. Supprimer toutes les questions d'une catérogie enlève cette catégorie des choix dans le drop down de la page principale


**Bugs (2)**

1. Si un utilisateur entre uniquement des white spaces en tant que nom et appuit sur ''start quiz'', le jeu part tout de même.
2. Peu importe le nombre de questions choisies par l'utilisateur, le quiz n'affiche pas la bonne quantité de façon que ça semblerait aléatoire selon la catégorie choisie.
3. Parfois (surtout lorsque le nombre de questions est 4), une question est répétée deux fois.
4. Si le décompte tombe à 0 et que l'utilisateur termine tout de même de répondre aux questions, il arrive tout de même à l'écran affichant ses réponses et elles sont tout de même enregistrées dans le leaderboard.
5. Si un utilisateur essaye d'enregistrer une question vide, elle s'enregistre. 
6. Si un utilisateur essaye d'enregistrer une question dont la réponse n'est pas dans les choix, elle s'enregistre.
7. Après l'ajout valide d'une question, lorsque le formulaire se remet à jour, le placeholder des catégories n'apparaît pas.
8. Si un utilisateur supprime une question puis rafraîchit la page, la question réapparait (pas de persistance pour la suppression).


**Problèmes (2)**

1. Si la page est rafraichie au milieu d'un quiz, l'utilisateur est de retour sur la page de sélection.
2. Il n'est pas clair que le bouton ''save questions'' sert à sauvegarder les modifications faites aux edits.
3. Il faut descendre tout en bas pour trouver comment sauvegarder les questions, il faudrait un bouton présent sur chaque question individuelle.
4. Aucuns label n'est présent sur les inputs/forms.
5. Le contrast entre les couleurs choisies est très faible dans edit questions vis à vis du fond et des questions.
