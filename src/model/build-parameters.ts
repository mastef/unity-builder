import AndroidVersioning from './android-versioning';
import Input from './input';
import Platform from './platform';
import UnityVersioning from './unity-versioning';
import Versioning from './versioning';

class BuildParameters {
  static async create() {
    const buildFile = this.parseBuildFile(Input.buildName, Input.targetPlatform, Input.androidAppBundle);

    const unityVersion = UnityVersioning.determineUnityVersion(Input.projectPath, Input.unityVersion);

    const buildVersion = await Versioning.determineVersion(Input.versioningStrategy, Input.specifiedVersion);

    const androidVersionCode = AndroidVersioning.determineVersionCode(buildVersion, Input.androidVersionCode);

    return {
      version: unityVersion,
      customImage: Input.customImage,

      runnerTempPath: process.env.RUNNER_TEMP,
      platform: Input.targetPlatform,
      projectPath: Input.projectPath,
      buildName: Input.buildName,
      buildPath: `${Input.buildsPath}/${Input.targetPlatform}`,
      buildFile,
      buildMethod: Input.buildMethod,
      buildVersion,
      androidVersionCode,
      androidKeystoreName: Input.androidKeystoreName,
      androidKeystoreBase64: Input.androidKeystoreBase64,
      androidKeystorePass: Input.androidKeystorePass,
      androidKeyaliasName: Input.androidKeyaliasName,
      androidKeyaliasPass: Input.androidKeyaliasPass,
      customParameters: Input.customParameters,
      kubeConfig: Input.kubeConfig,
      githubToken: Input.githubToken,
      kubeContainerMemory: Input.kubeContainerMemory,
      kubeContainerCPU: Input.kubeContainerCPU,
      kubeVolumeSize: Input.kubeVolumeSize,
      kubeVolume: Input.kubeVolume,
    };
  }

  static parseBuildFile(filename, platform, androidAppBundle) {
    if (Platform.isWindows(platform)) {
      return `${filename}.exe`;
    }

    if (Platform.isAndroid(platform)) {
      return androidAppBundle ? `${filename}.aab` : `${filename}.apk`;
    }

    return filename;
  }
}

export default BuildParameters;
