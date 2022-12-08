Feature: Tetando API Gorest


Background:Executa antes de cada teste
       * def url_base = 'https://gorest.co.in/public/'
       * def token = 'd2da1975aaa92f697924d1c6b7bee619e08899262573dde9b943e006c8e49486'
       * def requestPayload = 
       """
        {
            "name": "Pedro Piccichelli",
            "email": "randomEmail@gmail.com",
            "gender": "male",
            "status": "inactive"
        }
       """

Scenario: Testando retorno 200 v2/users/4/posts.
        Given url url_base
        And path 'v2/users/4/posts'
        When method get
        Then status 200

Scenario: Testando entrar em uma url invalida na rota da api.
        Given url url_base
        And path 'a'
        When method get
        Then status 404

Scenario: Testando usar um delete numa endpoint get
        Given url url_base
        And path 'v2/users/4/posts'
        When method delete
        Then status 404

Scenario: Pegando o array response e testando os tipos
        Given url url_base
        And path 'v2/posts/'
        When method get
        Then status 200
        And match $ == '#[10]'
        And match each $ contains {id: "#number", title: "#string"}

Scenario: Usando metodo POST
    Given url url_base
    And path 'v1/users'
    And header Authorization = 'Bearer ' + token
    And request requestPayload 
    When method post
    Then status 201
    And match $.data.id == "#present"
    And match $.data.name == "Pedro Piccichelli"

