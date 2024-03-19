function limpa_formulario_cep() {
  document
    .getElementById("botao-deletar")
    .addEventListener("click", function () {
      document.getElementById("rua").value = "";
      document.getElementById("bairro").value = "";
      document.getElementById("cidade").value = "";
      document.getElementById("uf").value = "";
      document.getElementById("ibge").value = "";

      console.log("caixas limpas com sucesso");
    });
}

function roda_automatico() {
  document.getElementById("cep").addEventListener("input", function () {
    if (this.cep.length === 8) {
      this.pesquisacep();
    }
  });
}

function copia_cep() {
  document
    .getElementById("botao-copiar")
    .addEventListener("click", function () {
      const rua = document.getElementById("rua").value;
      const bairro = document.getElementById("bairro").value;
      const cidade = document.getElementById("cidade").value;
      const uf = document.getElementById("uf").value;
      const ibge = document.getElementById("ibge").value;

      const textarea = document.createElement("textarea");
      textarea.value =
        rua + ", " + bairro + ", " + cidade + ", " + uf;
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      console.log("Texto copiado com sucesso: ", textarea.value);
    });
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById("rua").value = conteudo.logradouro;
    document.getElementById("bairro").value = conteudo.bairro;
    document.getElementById("cidade").value = conteudo.localidade;
    document.getElementById("uf").value = conteudo.uf;
    document.getElementById("ibge").value = conteudo.ibge;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulario_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, "");
  // .replace(/(\d{5})(\d)/, "$1-$2");

  //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      document.getElementById("cep").value =
        cep.substring(0, 5) + "-" + cep.substring(5);

      //Cria um elemento javascript.
      var script = document.createElement("script");

      //Sincroniza com o callback.
      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);

      const aviso = document.getElementById("aviso-sucesso");
      document.getElementById("aviso-sucesso").style.display = "flex";

      // setTimeout(() => {
      //   document.getElementById("aviso-sucesso").classList.add("fadeout");
      // }, 2000);

      console.log("CEP consultado com sucesso.");
    } //end if.
    else {
      //cep é inválido.
      limpa_formulario_cep();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulario_cep();
  }
}

function popup() {
  const popup = document.querySelector(".botao-google-maps .popup");
  popup.style.display = "none";

  const button = document.querySelector(".botao-google-maps");
  button.addEventListener("mouseover", () => {
    popup.style.display = "block";
  });
  button.addEventListener("mouseout", () => {
    popup.style.display = "none";
  });
}

window.addEventListener("load", () => {
  popup();
});



