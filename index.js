const svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

const projection = d3.geoMercator()
    .center([0, 20])
    .scale(70)
    .translate([width / 2, height / 2])
let data = new Map()
const colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[7]);
// Load external data and boot
Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function (d) {
        data.set(d.code, +d.pop)
    })
]).then(function (loadData) {
    let topo = loadData[0]

    const mouseOver = function (d) {
        d3.selectAll('.Country')
            .transition()
            .duration(200)
            .style('opacity', .5)
        d3.select(this)
            .transition()
            .duration(200)
            .style('opacity', 1)
            .style('stroke', 'black')
    };

    let mouseLeave = function () {
        d3.selectAll('.Country')
            .transition()
            .duration(200)
            .style('opacity', .8)
        d3.select(this)
            .transition()
            .duration(200)
            .style('stroke', 'transparent')
    };

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(topo.features)
        .join("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
        })
        .style('stroke', 'transparent')
        .attr('class', d => 'Country')
        .style('opacity', 0.8)
        .on('mouseover', mouseOver)
        .on('mouseleave', mouseLeave)
})