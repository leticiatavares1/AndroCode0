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

<!--
Banco de dados Type
1 - Cliente
2 - Adm
3 - Barbeiro
-->
