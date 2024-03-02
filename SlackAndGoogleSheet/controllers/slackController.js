const { WebClient } = require('@slack/web-api');
const { googleSheetAppend } = require('../utils/googleSheetUtils');
require('dotenv').config();

const modalConfig = require('../views/modalConfig.json');

const token = process.env.SLACK_BOT_TOKEN;

const web = new WebClient(token, { retries: 0 });

async function learnSlashCommandHandler(req, res) {
    const { trigger_id: triggerId } = req.body;
    res.status(200).send('');
    (async () => {
        // Open a modal.
        await web.views.open({
        trigger_id: triggerId,
        view: modalConfig
        });
    })();
}

async function interactionHandler(req, res) {
    res.status(200).send();

    const payload = JSON.parse(req.body.payload);

    if (
        payload.type === 'view_submission' &&
        payload.view.callback_id === 'learn'
    ) {
        const { values } = payload.view.state;

        const activity = values.activity.activity.value;
        const selectedActivity = values.selectedActivity.selectedActivity.selected_option.text.text;
        const activityDatePicker = values.activityDatePicker.activityDatePicker.selected_date;
        const activityHours = values.activityHours.activityHours.value;

        await googleSheetAppend({
            activity: activity,
            selectedActivity: selectedActivity,
            activityDatePicker: activityDatePicker,
            activityHours: activityHours
        });
    }
}

module.exports = {
    interactionHandler,
    learnSlashCommandHandler
};