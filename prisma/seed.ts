import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // await generateAdmin();
  // await createRandomEmployees();
  // await createCategories();
  // await createCompanies();
  // createDepartaments()

  const admin = await prisma.employee.create({
    data : {
      name: "Admin 1",
      email: "admin1@mail.com",
      password: "12345678",
      isAdmin: true
    }
  })
  return console.log({admin})
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });

async function generateAdmin() {
  const user = await prisma.employee.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@mail.com",
      password: "12345678",
      isAdmin: true
    }
  });

  console.log(
    { user },
    `
    Usuário admin criado com sucesso!
    Utilize as seguintes credenciais:
    email: admin@mail.com
    password: 123456
    `
  );
}

async function createRandomEmployees() {
  const generatePassword = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  const generateUsers = (numUsers: number) => {
    const users = [];

    for (let i = 0; i < numUsers; i++) {
      const name = faker.internet.userName();
      const email = `${name.replace(/\s/g, "").toLowerCase()}${i}@example.com`;
      const password = generatePassword();

      users.push({ name, email, password });
    }

    return users;
  };

  const users = generateUsers(5000);

  for (const user of users) {
    const createdUser = await prisma.employee.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    console.log({ createdUser });
  }
}

async function createCategories() {
  const categories = [
    {
      name: "Alimenticio"
    },
    {
      name: "Varejo"
    },
    {
      name: "Textil"
    },
    {
      name: "Manufatura"
    },
    {
      name: "Aeroespacial"
    },
    {
      name: "Automotiva"
    },
    {
      name: "TI"
    },
    {
      name: "Atacado"
    },
    {
      name: "Energia"
    },
    {
      name: "Financeiro"
    },
    {
      name: "Farmacêutico"
    },
    {
      name: "Telecomunicações"
    },
    {
      name: "Entretenimento"
    },
    {
      name: "Construção"
    },
    {
      name: "Logística"
    },
    {
      name: "Educação"
    },
    {
      name: "Saúde"
    },
    {
      name: "Têxtil"
    },
    {
      name: "Hoteleiro"
    },
    {
      name: "Seguros"
    }
  ];

  for (const category of categories) {
    const response = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name
      }
    });

    console.log({ response });
  }
}

async function createCompanies() {
  const categories = await prisma.category.findMany();
  const companies = [
    {
      name: "Ambev",
      description: "Uma das maiores empresas de bebidas do mundo",
      categoryId: categories[0].id
    },
    {
      name: "Magazine Luiza",
      description: "Varejista de eletrônicos, móveis e eletrodomésticos",
      categoryId: categories[1].id
    },
    {
      name: "Hering",
      description: "Marca de roupas e moda",
      categoryId: categories[2].id
    },
    {
      name: "Embraer",
      description: "Empresa brasileira de aeronáutica",
      categoryId: categories[3].id
    },
    {
      name: "Gol Linhas Aéreas",
      description: "Companhia aérea brasileira",
      categoryId: categories[4].id
    },
    {
      name: "Gela Guela",
      description: "Sorvetes barateza",
      categoryId: categories[0].id
    },
    {
      name: "Skina Lanches",
      description: "Podrão de qualidade",
      categoryId: categories[0].id
    },
    {
      name: "Mercado Kenzie",
      description: "Padrão de qualidade",
      categoryId: categories[1].id
    },
    {
      name: "Gortifruti da Terra",
      description: "Natural e sem agrotóxicos",
      categoryId: categories[1].id
    },
    {
      name: "Tecidos Dona Florinda",
      description: "Nossos tecidos são nossos tesouros",
      categoryId: categories[2].id
    },
    {
      name: "Malhas Alberto",
      description: "Compre suas roupas de academia aqui! melhor preço da região",
      categoryId: categories[2].id
    },
    {
      name: "DevModa",
      description: "Roupas para um estilo de uma pessoa desenvolvedora",
      categoryId: categories[3].id
    },
    {
      name: "Edna Moda",
      description: "Roupas de grifes, mas sem capas",
      categoryId: categories[3].id
    },
    {
      name: "KenzieX",
      description: "Levando nossos desenvolvedores a outro mundo",
      categoryId: categories[4].id
    },
    {
      name: "Evolution Tech",
      description: "Focamos nossos estudos e desenvolvimento em foguetes melhores e mais rápidos!!",
      categoryId: categories[4].id
    }
  ];

  for (const company of companies) {
    const categoryId = company.categoryId || "";
    const response = await prisma.company.upsert({
      where: { name: company.name },
      update: {},
      create: {
        name: company.name,
        description: company.description,
        category: { connect: { id: categoryId } }
      }
    });
    console.log({ response });
  }
}

async function createDepartaments() {
  const companies = await prisma.company.findMany();

  companies.forEach(async (company) => {
  
    const departments = [
      {
        name: "Ventas",
        description: "Encargado de las actividades de venta y generación de ingresos",
        companyId: company.id
      },
      {
        name: "Marketing",
        description: "Encargado de la estrategia de marketing y promoción de la empresa",
        companyId: company.id
      },
      {
        name: "Recursos Humanos",
        description: "Encargado de la gestión del talento y las relaciones laborales",
        companyId: company.id
      },
      {
        name: "Finanzas",
        description: "Encargado de la gestión financiera y contable de la empresa",
        companyId: company.id
      },
      {
        name: "Operaciones",
        description: "Encargado de la gestión de las operaciones diarias de la empresa",
        companyId: company.id
      },
      {
        name: "Desarrollo de Producto",
        description: "Encargado de la investigación y desarrollo de nuevos productos",
        companyId: company.id
      },
      {
        name: "Calidad",
        description: "Encargado de garantizar la calidad de los productos y servicios de la empresa",
        companyId: company.id
      },
      {
        name: "Logística",
        description: "Encargado de la gestión y coordinación de la cadena de suministro",
        companyId: company.id
      },
      {
        name: "Investigación y Desarrollo",
        description: "Encargado de la investigación y desarrollo de nuevas tecnologías",
        companyId: company.id
      },
      {
        name: "Soporte Técnico",
        description: "Encargado de brindar soporte y asistencia técnica a los clientes",
        companyId: company.id
      },
      {
        name: "Diseño Gráfico",
        description: "Encargado de la creación y diseño de materiales gráficos",
        companyId: company.id
      },
      {
        name: "Producción",
        description: "Encargado de la producción y fabricación de productos",
        companyId: company.id
      },
      {
        name: "Investigación de Mercado",
        description: "Encargado de realizar estudios de mercado y análisis de datos",
        companyId: company.id
      },
      {
        name: "Servicio al Cliente",
        description: "Encargado de brindar atención y soporte al cliente",
        companyId: company.id
      },
      {
        name: "Recursos Humanos",
        description: "Encargado de la gestión del talento y las relaciones laborales",
        companyId: company.id
      },
      {
        name: "Publicidad",
        description: "Encargado de la creación y gestión de campañas publicitarias",
        companyId: company.id
      },
      {
        name: "Compras",
        description: "Encargado de las adquisiciones y compras de la empresa",
        companyId: company.id
      },
      {
        name: "Desarrollo de Negocios",
        description: "Encargado de identificar y desarrollar nuevas oportunidades de negocio",
        companyId: company.id
      },
      {
        name: "Investigación de Mercado",
        description: "Encargado de realizar estudios de mercado y análisis de datos",
        companyId: company.id
      },
      {
        name: "Tecnología de la Información",
        description: "Encargado de la gestión y mantenimiento de los sistemas informáticos",
        companyId: company.id
      }
    ];
    departments.forEach(async (department) => {
      const response = await prisma.department.create({
        data: department
      })
      console.log({ response });
    });
  });
}
