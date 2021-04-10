const controller = {}
const { Nota, Checklist, Tag, sequelize } = require('../models');

controller.getById = async (id) => {
  return await Nota.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Checklist,
        as: 'checklists',
      },
      {
        model: Tag,
        as: 'tags',
      },
    ],
  });
};

controller.getByUsuarioId = async (usuarioId, tag = null) => {
  let where = null;
  let required = false

  if (tag) {
    where = { nome: tag };
    required = true;
  }

  return await Nota.findAll({
    where: {
      usuarioId
    },
    include: [
      {
        model: Checklist,
        as: 'checklists',
      },
      {
        model: Tag,
        as: 'tags',
        where,
        required
      }
    ]
  })
}

controller.save = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }) => {
  const transaction = await sequelize.transaction();

  try {
    let { dataValues } = await Nota.create(
      {
        usuarioId,
        titulo,
        descricao
      },
      {
        transaction
      }
    );

    let notaSalva = dataValues;

    let checklistSalvos = [];

    if (checklists.length > 0) {
      for (let checklist of checklists) {
        checklist['notaId'] = notaSalva.id;
        const checklistSalva = await Checklist.create(checklist, { transaction })
        checklistSalvos.push(checklistSalva);
      }
    }

    let tagsSalvos = [];

    if (tags.length > 0) {
      for (let tag of tags) {
        tag['notaId'] = notaSalva.id;
        const tagSalva = await Tag.create(tag, { transaction });
        tagsSalvos.push(tagSalva)
      }
    }

    notaSalva['checklists'] = checklistSalvos;
    notaSalva['tags'] = tagsSalvos;

    await transaction.commit()
    return notaSalva

  } catch (error) {
    console.log(error);
    await transaction.rollback()
  }
}

//Outra forma que pensei em fazer seria dar um Update no modelo Nota, 
//Fazer um controller com um metodo para buscar as tags e os checklists da Nota, 
//Excluir esses registros(das tags e checklists) e cria-los novamente.
controller.edit = async (usuarioId, notaId, { titulo = null, descricao = null, checklists = [], tags = [] }) => {
  const transaction = await sequelize.transaction();

  try {
    let notaEditada = await Nota.update(
      {
        titulo,
        descricao
      },
      {
        where: {
          id: notaId,
          usuarioId
        },
      },
      {
        transaction
      }
    );

    let checklistEditados = [];

    if (checklists.length > 0) {
      for (let checklist of checklists) {
        let { id } = checklist
        delete checklist.id
        const checklistEditado = await Checklist.update(checklist, { where: { id, notaId } }, { transaction })
      }
      checklistEditados.push(checklists);
    }

    let tagsEditados = [];

    if (tags.length > 0) {
      for (let tag of tags) {
        let { id } = tag
        delete tag.id
        const tagEditado = await Tag.update(tag, { where: { id, notaId } }, { transaction });
      }
      tagsEditados.push(tags)
    }

    notaEditada = { titulo, descricao };
    notaEditada['checklists'] = checklistEditados;
    notaEditada['tags'] = tagsEditados;

    await transaction.commit()
    return notaEditada

  } catch (error) {
    console.log(error);
    await transaction.rollback()
  }
}

module.exports = controller