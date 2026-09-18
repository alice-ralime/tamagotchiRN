import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Vibration} from 'react-native';


const digiEgg = [
  {
    id:1, nome:"botamon",  imagem: require('./assets/botamon.png') //koromon - agumon
  },
  {
    id:2, nome:"cocomon", imagem: require('./assets/cocomon.png') //chocomon - lopmon
  },
  {
    id:3, nome:"zerimon", imagem: require('./assets/zerimon.png') //terriermon
  },
  {
    id:4, nome:"punimon", imagem: require('./assets/punimon.png') //tunomon - gabumon
  },
  {
    id:5, nome:"Yukimibotamon", imagem: require('./assets/yukimibotamon.png') //nyaromon - salamon
  },
  {
    id:6, nome:"Pururumon", imagem: require('./assets/pururumon.png') // poromon - hawkmon
  },
  {
    id:7, nome:"Chicomon", imagem: require('./assets/chicomon.png') //chibimon - veemon
  }
];


export default function App() {

  const[ovoEscolhido, setOvoEscolhido] = useState(null);

  const [fome, setFome] = useState(50);

  const [felicidade, setFelicidade] = useState(50);

  const [energia, setEnergia] = useState(50);

  const [dormindo, setDormindo] = useState(false);

  const [nivel, setNivel] = useState(0);

  const [mensagem, setMensagem] = useState('');

  const timerMensagem = useRef(null); // Ref para armazenar o ID do timer para as mensagens não sumirem antes do tempo!



  useEffect(() => {
    const relogio = setInterval(() => {
      setFome(fomeAtual => Math.max(fomeAtual - 1, 0));
      setFelicidade(felicidadeAtual => Math.max(felicidadeAtual - 1, 0));

      if (dormindo === true) {
        setEnergia(energiaAtual => Math.min(energiaAtual +5, 100));
        setFome(fomeAtual => Math.max(fomeAtual - 2, 0));
      }

    }, 3000);
    
    return () => clearInterval(relogio);
  }, [dormindo]);


  useEffect(() => {
    if (dormindo === true && fome === 0) {
      setDormindo(false);
    }

  },  [dormindo, fome]);


  useEffect(() => {
    if (energia === 100) {
      setDormindo(false);
    }

  },  [energia]);



  return (

    <ImageBackground 
      source={require('./assets/bg3.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="auto" />




{ovoEscolhido === null &&(
<View style={{ gap: 10, marginTop: 20, alignItems: 'center' }}>

  <texto style={styles.titulo}>Escolha um novo companheiro!</texto>

  {digiEgg.map((eggAtual) => (
    <TouchableOpacity
      key = {eggAtual.id}
      style = {styles.botao}
      onPress={() => {
        setOvoEscolhido(eggAtual);
      }}
    >
    <Text style={styles.textoBotao}>{eggAtual.nome}</Text>
    </TouchableOpacity>
  ))}
</View>
)}

{ovoEscolhido !== null &&(
  <>
        <Text style={styles.titulo}>"oi alices"</Text>
        <Text style={styles.status}>Fome: {fome}</Text>
        <Text style={styles.status}>Felicidade: {felicidade}</Text>
        <Text style={styles.status}>Energia: {energia}</Text>
        <Text style={styles.status}>Nível: {nivel}</Text>

    <Text style={{ fontSize: 20, color: 'blue', fontWeight: 'bold', height: 30 }}>
      {mensagem}
    </Text>

        <Image 
          source={ovoEscolhido?.imagem}
          style={{ width: 200, height: 200, marginTop: 50 }}
        />

          <View style={styles.areaBotao}>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                setFome(Math.min(fome + 10, 100));
                setMensagem('nhac!');
                Vibration.vibrate(100);

                if (timerMensagem.current) {
                clearTimeout(timerMensagem.current);
              }

              timerMensagem.current = setTimeout(() => {
              setMensagem('');
              }, 2000);
                  
              }}
            >
              <Text style={styles.textoBotao}>Alimentar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botao}
              
              onPress={() => {
                setFelicidade(Math.min(felicidade + 10, 100));
                setFome(Math.max(fome - 3, 0));
                setEnergia(Math.max(energia - 5, 0));
                setMensagem('yayyy!');
                Vibration.vibrate(100);

                if (timerMensagem.current) {
                clearTimeout(timerMensagem.current);
              }

              timerMensagem.current = setTimeout(() => {
              setMensagem('');
              }, 2000);
                  
              }}
            >
              
            <Text style={styles.textoBotao}>Brincar</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.botao}
              
              onPress={() => {
                setDormindo(true);
                setMensagem('zzzzzzz!');
                Vibration.vibrate(100);

                if (timerMensagem.current) {
                clearTimeout(timerMensagem.current);
              }

              timerMensagem.current = setTimeout(() => {
              setMensagem('');
              }, 2000);
                  
              }}
            >
              
            <Text style={styles.textoBotao}>Dormir</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.botao}
              
              onPress={() => {
                setOvoEscolhido(null);
                Vibration.vibrate(100);

              timerMensagem.current = setTimeout(() => {
              setMensagem('');
              }, 2000);
                  
              }}
            >
            <Text style={styles.textoBotao}>DigiEggs</Text>
            </TouchableOpacity>

            
          </View>
  </>

  )};
</ImageBackground>
);
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },


  titulo:{
    fontSize:44,
    fontWeight:'bold',
    color: '#fefeff',
    fontFamily: 'Courier',
  },

    status:{
    fontSize:24,
    fontWeight:'bold',
    color: '#bfedff',
    fontFamily: 'Courier',
  },

  areaBotao:{
    flexDirection: 'row',  
    gap: 20,              
    marginTop: 40,
  },

    telaTamagotchi:{
    width: '65%',
    alignItems: 'center',
        borderWidth: 5,
            borderColor: '#422d4a',
    borderRadius: '100%',     
    backgroundColor: '#b480c5',             
    marginTop: 40,

  },
  botao:{
    backgroundColor: '#9a77ba',
    borderColor: '#ffffff',
    borderWidth: 3,
    padding: 15,                
    borderRadius: 25,           
    width: 130,              
    alignItems: 'center',
  },

    textoBotao:{
    color: '#fff',              
    fontWeight: 'bold',         
    fontSize: 16,
    
  }
});
