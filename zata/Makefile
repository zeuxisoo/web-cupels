all:
	@echo "make release"

generate-key:
	@keytool -genkey -v -keystore $(KEY_STORE) -alias web-cupels-zata -keyalg RSA -keysize 2048 -validity 10000

release:
	@cd android && ./gradlew installRelease
