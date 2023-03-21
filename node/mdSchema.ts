export const schema = {
  name: 'mdv1',
  schema: {
    properties: {
      followers: {
        type: 'string',
        title: 'Seguidores',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email',
      },
      cluster: {
        type: 'string',
        maxLength: 100,
        title: 'Customer cluster',
      },
      lastInteractionIn: {
        type: 'string',
        format: 'date-time',
        title: 'Ultima interação em',
      },
      birthDate: {
        type: 'string',
        format: 'date-time',
        title: 'Data de nascimento',
      },
      accountId: {
        type: 'string',
        maxLength: 50,
        title: 'ID da loja',
      },
      id: {
        type: 'string',
        maxLength: 100,
        title: 'Id do documento',
      },
      documentType: {
        type: 'string',
        maxLength: 50,
        title: 'Tipo documento',
      },
      isCorporate: {
        type: 'boolean',
        title: 'É Empresa?',
      },
      stateRegistration: {
        type: 'string',
        maxLength: 750,
        title: 'Inscrição Estadual',
      },
      updatedIn: {
        type: 'string',
        format: 'date-time',
        title: 'Atualizado em',
      },
      homePhone: {
        type: 'string',
        title: 'Telefone Residencial',
      },
      birthDateMonth: {
        type: 'integer',
        title: 'Mês de aniversário',
      },
      corporateDocument: {
        type: 'string',
        maxLength: 50,
        title: 'CNPJ',
      },
      auto_filter: {
        type: 'string',
        title: 'Filtro autoático',
      },
      approved: {
        type: 'boolean',
        title: 'Aprovado',
      },
      rclastcartvalue: {
        type: 'number',
        title: 'Valor do Último Carrinho',
      },
      tags: {
        type: 'string',
        title: 'Tags',
      },
      rclastsessiondate: {
        type: 'string',
        format: 'date-time',
        title: 'Data da Última Sessão',
      },
      createdIn: {
        type: 'string',
        format: 'date-time',
        title: 'Criado em',
      },
      phone: {
        type: 'string',
        title: 'Telefone',
      },
      accountName: {
        type: 'string',
        maxLength: 100,
        title: 'Nome da loja',
      },
      lastName: {
        type: 'string',
        maxLength: 750,
        title: 'Sobrenome',
      },
      gender: {
        type: 'string',
        maxLength: 50,
        title: 'Sexo',
      },
      rclastsession: {
        type: 'string',
        maxLength: 50,
        title: 'Última sessão',
      },
      tradeName: {
        type: 'string',
        maxLength: 750,
        title: 'Nome Fantasia',
      },
      document: {
        type: 'string',
        maxLength: 50,
        title: 'Documento',
      },
      customerClass: {
        type: 'string',
        maxLength: 750,
        title: 'CustomerClass',
      },
      isNewsletterOptIn: {
        type: 'boolean',
        title: 'Recebe Newsletter?',
      },
      priceTables: {
        type: 'string',
        maxLength: 750,
        title: 'priceTables',
      },
      corporateName: {
        type: 'string',
        maxLength: 750,
        title: 'Razão Social',
      },
      firstName: {
        type: 'string',
        maxLength: 750,
        title: 'Nome',
      },
      businessPhone: {
        type: 'string',
        maxLength: 100,
        title: 'Telefone Comercial',
      },
      rclastcart: {
        type: 'string',
        title: 'Último Carrinho',
      },
      userId: {
        type: 'string',
        maxLength: 50,
        title: 'Id do usuário',
      },
      localeDefault: {
        type: 'string',
        maxLength: 10,
        title: 'Localização padrão',
      },
      dataEntityId: {
        type: 'string',
        maxLength: 10,
        title: 'Entidade de dados',
      },
    },
    required: ['email', 'id', 'accountId', 'accountName', 'dataEntityId'],
    'v-indexed': [
      'cluster',
      'customerClass',
      'email',
      'brandVisitedTag',
      'categoryVisitedTag',
      'departmentVisitedTag',
      'productVisitedTag',
      'userId',
      'firstName',
      'lastName',
      'document',
      'isNewsletterOptIn',
      'localeDefault',
      'approved',
      'id',
      'accountName',
      'dataEntityId',
      'createdBy',
      'createdIn',
      'updatedBy',
      'updatedIn',
      'lastInteractionBy',
      'lastInteractionIn',
      'followers',
      'tags',
    ],
  },
}
