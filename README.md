<h2>Qlik Sense BiPolar Bar Chart</h2>
An interesting visualisation to compare two measures for values in a dimension. In the example provided I compare the sales mix vs the Orders mix.
<br>
<img src="https://github.com/ardwork/BiPolarChart-RGraph/blob/master/img/chart.JPG">
<img src="https://github.com/ardwork/BiPolarChart-RGraph/blob/master/img/chart2.JPG">

<br>
<br>
<h3>Known Limitations and points to think about when using:</h3>
<ul><li>If you have more than 10 dimension values, consider using the limit dimension option to show the top 10 and others. This will ensure the bars do not become unreadable as the scroll bar does not appear in this version.</li>
<li>You can use this object once on a sheet, if multiple are used only the first will render.</li>
<li>If you use this chart on multiple sheets with different measures (which you can) the chart settings appear to affect all versions in the application. Both charts work but only one set of color ect setting is possible.</li>
<li>The scale is fixed for both axes so the values in both measures should be providing similar types of values.</li>
</ul>
