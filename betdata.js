

function sixOddReport() {

}

function betData(search) {
  let text = document.querySelector(".bet-data-textarea").value;
  
  let timestamp = new Date();

  text = text.replace(/able\n/i, "@");
  text = text.split("@")[1];
  text = text.replace(/week\s\d/ig, "@").replace(/week\s\d\d/ig, "@")
             .replace(/\:/ig, "").replace(/\d\d\d\d\d/ig, "")
             .replace(/\s\d\s/ig, "").replace(/@\s/ig, "@\n")
             .replace(/@\n\s/ig, "@\n").replace(/@\d/ig, "@")
             .replace(/\t/ig, "#")
             .replace(/\n/ig, "&")
             .replace(/\s/ig, "");
                   
  text = text.split("@");  
  
  let season = [];
  for (let i = 0; i < text.length; i++) {
    text[i] = text[i].split("\n")
    for (let j = 0; j < text[i].length; j++) {
      let week = [];
      let match = text[i][j].split("&");
      
      week.push(match[1])      
      week.push(match[2])      
      week.push(match[3])      
      week.push(match[4])      
      week.push(match[5])      
      week.push(match[6])      
      week.push(match[7])      
      week.push(match[8])      
      week.push(match[9])      
      week.push(match[10])      
      week.push(match[11])      
      
      if (match[1] == "") {
        week.splice(0,1)
      } else if(match[11] == "") {
        week.splice(10,1)
      } else {
      }
      season.push(week);
   }
  }
  season.splice(0,1)
  document.querySelector(".bet-data-textarea").value = JSON.stringify(season,null,4);
    const insertSeason = {
        date: timestamp.toLocaleString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }),
        data: JSON.stringify(season),
    };

        /*db.season
          .add(insertSeason)
          .then(function () {
            alert("Bet Data Saved!");
          });
        */
          function teamReport(){
            let reports = {};
            reports.winData = [];
            reports.positionRow = [];
            reports.positionColumn = [];
            reports.teamARow = [];
            reports.teamAColumn = [];
            reports.teamBRow = [];
            reports.teamBColumn = [];
            
            for (let i = 0; i < season.length; i++) {
              for (let j = 0; j < season[i].length; j++) {
                const match = season[i][j];
                score = match.replace(/#/ig,"")
                reportScore = score;
                score = score.split("-")
                teamAName = score[0].replace(/\d/ig,"");
                teamBName = score[1].replace(/\d/ig,"");
                teamA = score[0].replace(/\D/ig,"");
                teamB = score[1].replace(/\D/ig,"");
                position = j+1;
                week = i+1;
                //console.log(week);
                //Correct Score
                if(`${teamA}-${teamB}` === "2-1"){
                  reports.winData.push(`WK${week}: ${position} ${reportScore}`);
                } else {
                  console.log("No Correct Score found");
                }
                              }
            }
            console.table(reports.winData)
        }
          teamReport();
}

document.querySelector(".bet-data-btn").addEventListener("click", (event) => {
  betData();
});
