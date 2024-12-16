json.partial! 'api/v1/models/account', formats: [:json], resource: @account
json.latest_waselchat_version @latest_waselchat_version
json.partial! 'enterprise/api/v1/accounts/partials/account', account: @account if WaselchatApp.enterprise?
