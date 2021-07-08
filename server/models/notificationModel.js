const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
	{
		userTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		userFrom: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		notificationType: {
			type: String,
		},
		opened: {
			type: Boolean,
			default: false,
		},
		entityId: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ timestamps: true }
);

notificationSchema.statics.insertNotification = async (
	userTo,
	userFrom,
	notificationType,
	entityId
) => {
	var data = {
		userTo,
		userFrom,
		notificationType,
		entityId,
	};

	await Notification.deleteOne(data).catch(error => console.log(error));

	return await Notification.create(data);
};

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
