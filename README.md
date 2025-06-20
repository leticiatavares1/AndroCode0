# Wolf Studio Barber App

O projeto consiste no desenvolvimento de uma plataforma para Android, com o principal objetivo de facilitar o agendamento de serviços em uma barbearia. A proposta é tornar a experiência do usuário mais agradável e oferecer um agendamento mais prático e personalizável.
## 🔧 Requisitos:

- React-Native

- TypeScript

- Banco de dados: FireBase

# paticipantes do projeto:
```
Felipe de Lima 
João Vitor Nascimento
Letícia Tavares Braga
```

🗃️ Tabela agendamentos com os seguintes campos:
```
id: string (primary key)  // Ex: "OT3gQ0TO8Q1BHTv_GPZ"
categoria: text           // Ex: "Cabelo"
servico: text             // Ex: "Corte tradicional"
profissional: text        // Ex: "Eslley"
dataAgendamento: date     // Ex: "2025-06-19"
horarioAgendamento: time  // Ex: "18:30"
preco: text               // Ex: "R$ 35,00"
status: text              // Ex: "Confirmado"
dataCriacao: timestamp    // Ex: "2025-06-18T20:18:45.848Z"
userId: string (foreign key → usuarios.id)
userEmail: text           // Ex: "joao.v.n.sabino@gmail.com"
```

🗃️ Tabela usuarios com os seguintes campos:
```
id: string (primary key)      // Ex: "c2WMg3jWHBMnDoBi8RD5FeaZVOg2"
timestamp: timestamp          // Ex: "2025-06-18T17:04:06.503Z"
nomeCompleto: text            // Ex: "João Vitor Nascimento Sabino"
telefone: text (nullable)     // Ex: "(19) 97111-7179"
email: text (nullable)        // Ex: "joao.v.n.sabino@gmail.com"
tipoUsuario: int              // Ex: 1
```

## 📁 Estrutura do projeto:
```
WOLF_STUDIO_BARBER/
├── .expo/
├── .vscode/
├── android/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── Home/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Agendado/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Informacoes/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── Conta/
│   │       ├── index.tsx
│   │       └── styles.ts
│   ├── screens/
│   │   ├── Cadastro/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Login/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── EsqueceuSenha/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Servicos/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── AgendamentoConfirmado/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── AgendarServico/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── _layout.tsx
│   ├── index.tsx
│   └── _layout.tsx
├── assets/
├── documents/
├── firebase/
├── node_modules/
├── videos/
├── .gitignore
├── app.json
├── expo-env.d.ts
├── google-services.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

📦 Instale os requisitos do projeto:
```
npm install
```

⚙️ Gerar build de desenvolvimento (instala no emulador ou dispositivo Android):
```
npx expo run:android
Esse comando compila o app em modo de desenvolvimento e instala automaticamente no emulador ou dispositivo Android conectado.
```
📱 Após o app estar instalado:
```
npx expo start --dev-client
```
🧼 Rodar o projeto limpo (limpeza de cache do Android Studio):
```
cd android
./gradlew clean
cd ..
```
🔄 Limpeza completa da estrutura Android/iOS com base no app.json:
```
npx expo prebuild --clean
```

## 🚀 Execute o projeto:
```
npm start
```
```
npm run android
```
```
npx expo start
```

🧪 Imagens – Esboços e Fase de Criação

![image](https://github.com/user-attachments/assets/fadfb9e5-04e6-4000-8028-c1d0bf44f606)
![image](https://github.com/user-attachments/assets/7f631101-5cce-44fc-b472-e5831741905c)

📱 Imagens – Telas Principais do Aplicativo

![73adf2b5fa9748969ec04756feb46f13](https://github.com/user-attachments/assets/3accc6d3-6e4f-448a-a825-ef2154c6d06b)
![2439031ac1c34c3a8a6bd0b60f76f39e](https://github.com/user-attachments/assets/2ab156e8-2bcf-4f4f-b87d-5351ab3e3712)
![c5ace88cbad14beab24b08a67ffb72bd](https://github.com/user-attachments/assets/6e6b44c1-ec01-4d2e-9350-1b66ff9d4f51)
![d20ace55dd894fab8f10bc052b4bdd92](https://github.com/user-attachments/assets/b24c25cd-094e-4f6a-bdb5-4ad23a85532d)
![df85c1b705744d1697fb5c6cf9b7637a](https://github.com/user-attachments/assets/ef0e0cef-33cf-4013-97db-805632286735)
![Imagem do WhatsApp de 2025-05-24 à(s) 19 11 43_205f76fa](https://github.com/user-attachments/assets/455ffe13-e4a8-46ae-be07-33fbc11b1471)
![Imagem do WhatsApp de 2025-05-24 à(s) 19 11 43_22611409](https://github.com/user-attachments/assets/1f15e35b-ea77-4553-b748-d460b054b60d)


<!--
# Wolf Studio Barber App

<h3>Comandos para rodar o projeto:</h3>

<p>Comando para instalar as dependencias do projeto <strong>npm install</strong></p>

<p>Comando para rodar o projeto <strong>npm start</strong> ou <strong>npm run android</strong> ou <strong>npx expo start</strong></p>

<h3>Rode esse comando para gerar um build de desenvolvimento:</h3>

<p>npx expo run:android</p>

<p>Esse comando compila o app em modo de desenvolvimento</p>

<p>Instala ele no seu emulador ou dispositivo Android</p>

<h3>Com o aplicativo instalado:</h3>

<p>npx expo start --dev-client</p>

<h3>Caso seja a primeira vez executando o projeto:</h3> 

<p>Basta executar o comando <strong>"npm install"</strong> e após instalar as dependências, executar os comandos acima.</p>

<h3>Instalando dependencias e outros comandos: </h3>

<p>Para instalar dependências e utilizar outros comandos é necessário utilizar <strong>npx expo "comando"</strong> podendo ser uma instalação ou até mesmo rodar o projeto sem cache utilizando o comando <strong>npx expo start --clear</strong></p>

<h3>Comandos para rodar o projeto limpo</h3>
<p>Este comando limpa o "cache"
</br>
cd android
</br>
./gradlew clean
</br>
cd ..
</p>
<p>O expo prebuild --clean vai recriar toda a pasta android/ (e ios/ se existir), com base no app.json.</p>

<h3>Link para acessar a documentação e a apresentação do aplicativo</h3>
<a>https://drive.google.com/drive/folders/1FNlZcNNminuQRKbVTqsr2wDKnUzNFk8q?usp=sharing</a>

Banco de dados Type
1 - Cliente
2 - Adm
3 - Barbeiro
-->
