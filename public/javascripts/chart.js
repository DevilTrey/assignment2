document.addEventListener("DOMContentLoaded",function(){
    const labels = ["PC", "PS4"]
    const data = {
        labels: labels,
        datasets: [{
            // label: 'My First Dataset',
            data: [parseInt("<%= pc1 %>"), parseInt("<%= Ps4 %>")],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                // 'rgb(54, 162, 235)',
                // 'rgb(153, 102, 255)',
                // 'rgb(201, 203, 207)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                // 'rgb(54, 162, 235)',
                // 'rgb(153, 102, 255)',
                // 'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }],

    };
    const config = {
        type: 'bar',
        data: data,

        options: {
            indexAxis: "y",
            plugins: {
                title: {
                    display: true,
                    text: 'gross floor area ranging from 100 sq.m. to 170 sq.m. ',
                    font: {
                        size: 24
                    },
                    padding: 10
                },
                legend: {
                    display: false
                }
            },
            scales: {

                x: {
                    title: {
                        display: true,
                        text: "bedrooms",
                        font: {
                            size: 12
                        },
                        padding: 5
                    }
                },
            },
        }
    };
    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
});