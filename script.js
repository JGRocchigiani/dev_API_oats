let notas = []
        let proximoId = 1
        //serve para dar um numero unicopra cada anot.

        function criarNota(titulo,conteudo,tag) {
            const novaNota = {
                id: proximoId++, //o ++ soma 1 ao valor atual
                titulo: titulo,
                conteudo: conteudo,
                tag:tag,
            };
            notas.push(novaNota); //insere no final do array
            return { sucesso: true, mensagem: "Anotação criada com sucesso."}
        }

        function lerNotas(id) {
            if (id === undefined) {
                return notas;
            }
            const encontrada = notas.find(function (n) {
                return n.id === id;
            });
            return encontrada || null;
        }
        // guarda uma ref ao objeto DENTRO do array 
        function atualizarNota(id,dadosNovos){
            const nota = notas.find(function (n){
                return n.id === id;
            })

            if(!nota) {
                return {sucesso: false, mensagem: "Anotação não encontrada."}
            }

             if (dadosNovos.titulo !== undefined) nota.titulo = dadosNovos.titulo;
             if (dadosNovos.conteudo !== undefined) nota.conteudo = dadosNovos.conteudo;
             if (dadosNovos.tag !== undefined) nota.tag = dadosNovos.tag;

             return { sucesso: true, mensagem: "Anotação atualizada com sucesso."}
        }

        function deletarNota(id) {
             const indice = notas.findIndex(function (n) {
                return n.id === id;
            })

             if (indice === -1) {
           return { sucesso: false, mensagem: "Anotação não encontrada." };
       }

          notas.splice(indice, 1);
              return { sucesso: true, mensagem: "Anotação excluída com sucesso." };
       }
    
    //para cada elem html
     const form = document.getElementById("form-nota");
     const inputTitulo = document.getElementById("input-titulo");
     const inputTag = document.getElementById("input-tag");
     const inputConteudo = document.getElementById("input-conteudo");
     const listaNotas = document.getElementById("lista-notas");
     let idEmEdicao = null; //guarda o id da nota q esta sendo editada
  
     function renderizarNotas() {
        const todasNotas = lerNotas();
        listaNotas.innerHTML = "";

        todasNotas.forEach(function (nota) {
            listaNotas.innerHTML +=
     
            "<p>" +
            "<strong>" + nota.titulo + "</strong> (" + nota.tag + "): " + nota.conteudo +
            " <button onclick='excluir(" + nota.id + ")'>Excluir</button>" +
            " <button onclick='editar(" + nota.id + ")'>Editar</button>" +
            "</p>";
  });
}

function excluir(id) { //chamada do botao exluir
  deletarNota(id);
  renderizarNotas();
}

function editar(id) { //chamada do editar
  const nota = lerNotas(id);
  if (!nota) return;

  inputTitulo.value = nota.titulo;
  inputTag.value = nota.tag;
  inputConteudo.value = nota.conteudo;

  idEmEdicao = nota.id;
  form.querySelector("button").textContent = "Atualizar";
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();  // impede o navegador de recarregar a página

  if (idEmEdicao === null) {
    criarNota(inputTitulo.value, inputConteudo.value, inputTag.value);
  } else {
    atualizarNota(idEmEdicao, {
      titulo: inputTitulo.value,
      conteudo: inputConteudo.value,
      tag: inputTag.value
    });
    idEmEdicao = null;
    form.querySelector("button").textContent = "Salvar";
  }

  form.reset();
  renderizarNotas();
});
renderizarNotas();