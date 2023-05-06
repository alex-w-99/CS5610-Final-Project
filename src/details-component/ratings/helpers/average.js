/*
 * calculate the new average given the total number of observations
 * pass null for oldScore if you're not updating a value that was already
 * factored into the average
 */
const average = (oldScore, newScore, currAvg, numObservations) => {
   console.log("AVERAGE: oldScore - " + oldScore + " newScore : " + newScore);
   console.log("currAvg: " + currAvg + " numObservations " + numObservations);
   if (numObservations == 0) {
       return newScore
   } else if (oldScore != null) {
       return ((currAvg * numObservations) + (newScore - oldScore)) / numObservations;
   } else {
       return ((currAvg * numObservations) + newScore) / (numObservations + 1);
   }
}
export default average;