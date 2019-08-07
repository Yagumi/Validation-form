function betterThanAverage(classPoints, yourPoints) {
	classPoints.push(yourPoints);
  const averagePoint = classPoints.reduce((prev, next) => (prev + next)) / classPoints.length;
  let result;
  (averagePoint <= yourPoints) ? result = true : result = false;
  console.log(result);
  return result;
}

betterThanAverage([10, 10], 5);

