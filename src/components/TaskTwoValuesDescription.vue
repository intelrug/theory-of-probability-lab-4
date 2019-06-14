<template>
  <div>
    <br>
    <br>
    <img
      src="https://chart.googleapis.com/chart?chs=30&cht=tx&chl=M(x)=1/p"
      alt="formula">
    <br>
    <br>
    <img
      src="https://chart.googleapis.com/chart?chs=30&cht=tx&chl=D(x)=q/p^2"
      alt="formula">
    <br>
    <br>
  </div>

</template>

<script>
export default {
  name: 'TaskTwoValuesDescription',
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
