<template>
  <div>
    <br>
    <br>
    <img src="https://chart.googleapis.com/chart?chs=40&cht=tx&chl=M(x)=\sum_{i=1}^kp_in_i"
         alt="formula">
    <br>
    <br>
    <img
      src="https://chart.googleapis.com/chart?chs=30&cht=tx&chl=D(x)=M(x^2) - M(x)^2"
      alt="formula">
    <br>
    <br>
    <img
      src="https://chart.googleapis.com/chart?chs=40&cht=tx&chl=\sigma(x)=\sqrt{D(x)}"
      alt="formula">
    <br>
    <br>
  </div>

</template>

<script>
export default {
  name: 'TaskOneValuesDescription',
};
</script>

<style scoped>
  table {
    margin-top: 15px;
    border-collapse: collapse;
  }

  td {
    border: 1px solid #aeaeae;
    text-align: center;
    padding: 3px 10px;
  }

  td > p {
    padding: 3px;
    margin: 0;
  }
</style>
