function dashboardController() {
    return {
        dashboard(req, res) {
            res.render('dashboard/dashboard', {
                layout: 'dashboardLayout'
            })
        },
    }
}

module.exports = dashboardController