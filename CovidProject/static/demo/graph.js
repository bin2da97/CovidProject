var labels1 = JSON.parse('{{ label_list1 | tojson | safe}}');
var labels2 = JSON.parse('{{ label_list2 | tojson | safe}}');
var datas1 = JSON.parse('{{ data_list1 | tojson | safe}}');
var datas2 = JSON.parse('{{ data_list2 | tojson | safe}}');
var datas_0_5 = JSON.parse('{{ data_0_5_list | tojson | safe}}');

const groupedData = {};

labels2.forEach(([city, district]) => {
  if (!groupedData[city]) {
    groupedData[city] = [];
  }
  groupedData[city].push(district);
});

$(document).ready(function () {
  const ctx1 = document.getElementById('myChart1');
  const ctx2 = document.getElementById('myChart2');
  const ctx3 = document.getElementById('myChart3');
  const ctx4 = document.getElementById('myChart4');
  const ctx5 = document.getElementById('myChart5');
  const ctx6 = document.getElementById('myChart6');
  const ctx7 = document.getElementById('myChart7');
  const ctx8 = document.getElementById('myChart8');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: datas_0_5[0][0].index,
      datasets: [
        {
          label: '합계',
          data: datas_0_5[0][0].data, //합계
          borderWidth: 1,
        },
        {
          label: '국내발생',
          data: datas_0_5[0][1].data, //합계
          borderWidth: 1,
        },
        {
          label: '해외유입',
          data: datas_0_5[0][2].data, //합계
          borderWidth: 1,
        },
        {
          label: '사망',
          data: datas_0_5[0][3].data, //합계
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: datas_0_5[1][0].index,
      datasets: [
        {
          label: '누적 확진자',
          data: datas_0_5[1][0].data, // 합계
          borderWidth: 1,
        },
        {
          label: '0-9세',
          data: datas_0_5[1][1].data,
          borderWidth: 1,
        },
        {
          label: '10-19세',
          data: datas_0_5[1][2].data,
          borderWidth: 1,
        },
        {
          label: '20-29세',
          data: datas_0_5[1][3].data,
          borderWidth: 1,
        },
        {
          label: '30-39세',
          data: datas_0_5[1][4].data,
          borderWidth: 1,
        },
        {
          label: '40-49세',
          data: datas_0_5[1][5].data,
          borderWidth: 1,
        },
        {
          label: '50-59세',
          data: datas_0_5[1][6].data,
          borderWidth: 1,
        },
        {
          label: '60-69세',
          data: datas_0_5[1][7].data,
          borderWidth: 1,
        },
        {
          label: '70-79세',
          data: datas_0_5[1][8].data,
          borderWidth: 1,
        },
        {
          label: '80세 이상',
          data: datas_0_5[1][9].data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: datas_0_5[2][0].index,
      datasets: [
        {
          label: '합계',
          data: datas_0_5[2][0].data, //합계
          borderWidth: 1,
        },
        {
          label: '남',
          data: datas_0_5[2][1].data, //합계
          borderWidth: 1,
        },
        {
          label: '여',
          data: datas_0_5[2][2].data, //합계
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx4, {
    type: 'line',
    data: {
      labels: datas_0_5[3][0].index,
      datasets: [
        {
          label: '합계',
          data: datas_0_5[3][0].data, //합계
          borderWidth: 1,
        },
        {
          label: '서울 발생',
          data: datas_0_5[3][1].data, //합계
          borderWidth: 1,
        },
        {
          label: '부산 발생',
          data: datas_0_5[3][2].data, //합계
          borderWidth: 1,
        },
        {
          label: '대구 발생',
          data: datas_0_5[3][3].data, //합계
          borderWidth: 1,
        },
        {
          label: '인천 발생',
          data: datas_0_5[3][4].data, //합계
          borderWidth: 1,
        },
        {
          label: '광주 발생',
          data: datas_0_5[3][5].data, //합계
          borderWidth: 1,
        },
        {
          label: '대전 발생',
          data: datas_0_5[3][6].data, //합계
          borderWidth: 1,
        },
        {
          label: '울산 발생',
          data: datas_0_5[3][7].data, //합계
          borderWidth: 1,
        },
        {
          label: '세종 발생',
          data: datas_0_5[3][8].data, //합계
          borderWidth: 1,
        },
        {
          label: '경기 발생',
          data: datas_0_5[3][9].data, //합계
          borderWidth: 1,
        },
        {
          label: '강원 발생',
          data: datas_0_5[3][10].data, //합계
          borderWidth: 1,
        },
        {
          label: '충북 발생',
          data: datas_0_5[3][11].data, //합계
          borderWidth: 1,
        },
        {
          label: '충남 발생',
          data: datas_0_5[3][12].data, //합계
          borderWidth: 1,
        },
        {
          label: '전북 발생',
          data: datas_0_5[3][13].data, //합계
          borderWidth: 1,
        },
        {
          label: '전남 발생',
          data: datas_0_5[3][14].data, //합계
          borderWidth: 1,
        },
        {
          label: '경북 발생',
          data: datas_0_5[3][15].data, //합계
          borderWidth: 1,
        },
        {
          label: '경남 발생',
          data: datas_0_5[3][16].data, //합계
          borderWidth: 1,
        },
        {
          label: '제주 발생',
          data: datas_0_5[3][17].data, //합계
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx5, {
    type: 'line',
    data: {
      labels: datas_0_5[4][0].index,
      datasets: [
        {
          label: '합계',
          data: datas_0_5[4][0].data, //합계
          borderWidth: 1,
        },
        {
          label: '서울 발생',
          data: datas_0_5[4][1].data, //합계
          borderWidth: 1,
        },
        {
          label: '부산 발생',
          data: datas_0_5[4][2].data, //합계
          borderWidth: 1,
        },
        {
          label: '대구 발생',
          data: datas_0_5[4][3].data, //합계
          borderWidth: 1,
        },
        {
          label: '인천 발생',
          data: datas_0_5[4][4].data, //합계
          borderWidth: 1,
        },
        {
          label: '광주 발생',
          data: datas_0_5[4][5].data, //합계
          borderWidth: 1,
        },
        {
          label: '대전 발생',
          data: datas_0_5[4][6].data, //합계
          borderWidth: 1,
        },
        {
          label: '울산 발생',
          data: datas_0_5[4][7].data, //합계
          borderWidth: 1,
        },
        {
          label: '세종 발생',
          data: datas_0_5[4][8].data, //합계
          borderWidth: 1,
        },
        {
          label: '경기 발생',
          data: datas_0_5[4][9].data, //합계
          borderWidth: 1,
        },
        {
          label: '강원 발생',
          data: datas_0_5[4][10].data, //합계
          borderWidth: 1,
        },
        {
          label: '충북 발생',
          data: datas_0_5[4][11].data, //합계
          borderWidth: 1,
        },
        {
          label: '충남 발생',
          data: datas_0_5[4][12].data, //합계
          borderWidth: 1,
        },
        {
          label: '전북 발생',
          data: datas_0_5[4][13].data, //합계
          borderWidth: 1,
        },
        {
          label: '전남 발생',
          data: datas_0_5[4][14].data, //합계
          borderWidth: 1,
        },
        {
          label: '경북 발생',
          data: datas_0_5[4][15].data, //합계
          borderWidth: 1,
        },
        {
          label: '경남 발생',
          data: datas_0_5[4][16].data, //합계
          borderWidth: 1,
        },
        {
          label: '제주 발생',
          data: datas_0_5[4][17].data, //합계
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx6, {
    type: 'bar',
    data: {
      labels: labels1,
      datasets: [
        {
          label: '누적 확진자',
          data: datas1[1], // 합계
          borderWidth: 1,
        },
        {
          label: '누적 발생',
          data: datas1[2], // 합계
          borderWidth: 1,
        },
        {
          label: '발생률(인구 10만명당, 명)',
          data: datas1[3], // 발생률 데이터
          borderWidth: 1,
        },
        {
          label: '사망률(인구 10만명당, 명)',
          data: datas1[4], // 사망률 데이터
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx7, {
    type: 'bar',
    data: {
      labels: groupedData['서울'],
      datasets: [
        {
          label: '누적 확진자',
          data: datas2[1].slice(0, 26), // 합계
          borderWidth: 1,
        },
        {
          label: '누적 발생',
          data: datas2[2].slice(0, 26), // 합계
          borderWidth: 1,
        },
        {
          label: '발생률(인구 10만명당, 명)',
          data: datas2[3].slice(0, 26), // 발생률 데이터
          borderWidth: 1,
        },
        {
          label: '사망률(인구 10만명당, 명)',
          data: datas2[4].slice(0, 26), // 사망률 데이터
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  new Chart(ctx8, {
    type: 'bar',
    data: {
      labels: groupedData['부산'],
      datasets: [
        {
          label: '누적 확진자',
          data: datas2[1].slice(26, 43), // 합계
          borderWidth: 1,
        },
        {
          label: '누적 발생',
          data: datas2[2].slice(26, 43), // 합계
          borderWidth: 1,
        },
        {
          label: '발생률(인구 10만명당, 명)',
          data: datas2[3].slice(26, 43), // 발생률 데이터
          borderWidth: 1,
        },
        {
          label: '사망률(인구 10만명당, 명)',
          data: datas2[4].slice(26, 43), // 사망률 데이터
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        myScale: {
          type: 'logarithmic',
          position: 'right', // `axis` is determined by the position as `'y'`
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});