
  var width = 700, height = 700
  var senado = 108
  var camara = 171
  var enviado = 29
  var entregaron = 14 // 9S 5C
  var valido = 11
  var analizable = 8

  var numNodes = 279
  var stepfunctions = []
  var stepTextInfo = []
  var step = 0 
  var nodes = d3.range(numNodes).map(function(d) {
      while(senado){
        while(enviado>14){
          while(entregaron>5){
            while(valido>3){
              while(analizable>3){
                analizable--;
                valido --;
                entregaron--;
                enviado--;
                senado--;
                return{
                  senado:1,
                  enviado:1,
                  entregaron:1,
                  valido:1,
                  analizable:1,
                  radius:5
                };
              }
            valido--;
            entregaron--;
            enviado--;
            senado--;
              return{
                senado:1,
                enviado:1,
                entregaron:1,
                valido:1,
                analizable:0,
                radius:5
              };
            }
          entregaron--;
          enviado--;
          senado--;
          return{
            senado:1,
            enviado:1,
            entregaron:1,
            valido:0,
            analizable:0,
            radius:5
              };    
          }
        enviado--;
        senado--;
          return{
            senado:1,
            enviado:1,
            entregaron:0,
            valido:0,
            analizable:0,
            radius:5
            };  
        }
        senado--;
        return{
            senado:1,
            enviado:0,
            entregaron:0,
            valido:0,
            analizable:0,
            radius:5
            };   
      }
      while(camara){
        while(enviado){
          while(entregaron){
            while(valido){
              while(analizable){
                analizable--;
                valido --;
                entregaron--;
                enviado--;
                camara--;
                return{
                  senado:0,
                  enviado:1,
                  entregaron:1,
                  valido:1,
                  analizable:1,
                  radius:5
                };
              }
            valido--;
            entregaron--;
            enviado--;
            camara--;
              return{
                senado:0,
                enviado:1,
                entregaron:1,
                valido:1,
                analizable:0,
                radius:5
              };
            }
          entregaron--;
          enviado--;
          camara--;
          return{
            senado:0,
            enviado:1,
            entregaron:1,
            valido:0,
            analizable:0,
            radius:5
              };    
          }
        enviado--;
        camara--;
          return{
            senado:0,
            enviado:1,
            entregaron:0,
            valido:0,
            analizable:0,
            radius:5
            };  
        }
        camara--;
        return{
            senado:0,
            enviado:0,
            entregaron:0,
            valido:0,
            analizable:0,
            radius:5
            };   
      }

  });

    stepTextInfo[0] = "Hoy el congreso lo componen en total 279 personas.";
    stepTextInfo[1] = "De estos, 108 pertenecen al Senado...";
    stepTextInfo[2] = "... y 171 pertenecen a la Cámara de Representantes.";
    stepTextInfo[3] = "Cuestión Pública le envió tutelas a 29.";
    stepTextInfo[4] = "Pero en total solo 14 entregaron información...";
    stepTextInfo[5] = "Y de estos solo 11 entregaron la información que se pidió.";
    stepTextInfo[6] = "Pero solo 8 son analizables...";
    stepTextInfo[7] = "Esto significa que a hoy falta información de 268 congresistas.";

  var textsvg = d3.select('#textinfo');

  text = textsvg
  .text(stepTextInfo[0])
  .exit();

  

  var svg = d3.select("#vis4");
  var g = svg.append("g");
  var simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return 13
      }));

      d3.timeout(function() {
      // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
     for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
       simulation.tick();
     }

      var im = g.selectAll('image')
        .data(nodes);

        im.enter()
        .append('image')
        .attr('xlink:href','https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg')
        .attr('width', function(d) {
          return 50
        })
        .attr('height', function(d) {
          return 50
        })
        .attr('x', function(d) {
          return d.x
        })
        .attr('y', function(d) {
          return d.y
        });




    });

    function showWhole(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return "1";});
        //im.exit().remove();   
    };     

    function showSenado(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return d.senado? "1":"0.1";});
        //im.exit().remove();   
    };
    function showCamara(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return d.senado? "0.1":"1";});
        //im.exit().remove();   
    };
    function showEnviado(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return d.enviado? "1":"0.1";});
        //im.exit().remove();   
    };
    function showEntregaron(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return d.entregaron? "1":"0.1";});
        //im.exit().remove();   
    };
    function showValido(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return d.valido? "1":"0.1";});
        //im.exit().remove();   
    };
    function showAnalizable(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return d.analizable? "1":"0.1";});
        //im.exit().remove();   
    };
    function showLoqueFalta(){
      var im = g.selectAll('image')
        .data(nodes);

        im.transition()
        .duration(1000)
        .attr('opacity',function(d){
          return d.valido? "0.1":"1";});
        //im.exit().remove();   
    };

      stepfunctions[0] = showWhole;
      stepfunctions[1] = showSenado;
      stepfunctions[2] = showCamara;
      stepfunctions[3] = showEnviado;
      stepfunctions[4] = showEntregaron;
      stepfunctions[5] = showValido;
      stepfunctions[6] = showAnalizable;
      stepfunctions[7] = showLoqueFalta; 

    function showNext(){
      console.log("next");
      step++;
      if(step > 7) step = 7;

      stepfunctions[step]();
      updateText(step);
    }
    function showPrevious(){
      step--;
      if(step <= 0) step = 0;
      stepfunctions[step]();
      updateText(step);

    }
    function updateText(step){
    var text = textsvg
    .transition()
    .duration(1000)
    .text(stepTextInfo[step]);
    }



