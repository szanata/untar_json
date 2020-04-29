module.exports = function TimedExecution() {
  const startTime = Date.now();
  let endTime = 0;
  let delta = 0;
  let outlier = false;
  return {
    end() {
      endTime = Date.now();
      delta = ( ( endTime - startTime ) / 1000 ).toFixed( 3 );
    },
    toJSON: () => ( {
      delta
    } )
  };
};
