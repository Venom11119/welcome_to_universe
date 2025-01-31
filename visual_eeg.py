import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import spectrogram


fs = 256  # Sampling frequency (Hz)
t = np.linspace(0, 10, fs * 10)  # 10 seconds of data

# Simulating different brainwave frequencies
delta = np.sin(2 * np.pi * 2 * t)  # 2 Hz (Delta)
theta = np.sin(2 * np.pi * 6 * t)  # 6 Hz (Theta)
alpha = np.sin(2 * np.pi * 10 * t)  # 10 Hz (Alpha)
beta = np.sin(2 * np.pi * 20 * t)  # 20 Hz (Beta)
gamma = np.sin(2 * np.pi * 40 * t)  # 40 Hz (Gamma)

# Combine signals and add noise
eeg_signal = delta + theta + alpha + beta + gamma + np.random.normal(0, 0.5, len(t))

plt.figure(figsize=(12, 4))
plt.plot(t, eeg_signal, label="Simulated EEG Signal", color='b', alpha=0.7)
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.title("Raw EEG Signal (Time Series)")
plt.legend()
plt.grid()
plt.show()

fft_vals = np.fft.rfft(eeg_signal)
fft_freqs = np.fft.rfftfreq(len(eeg_signal), 1/fs)

plt.figure(figsize=(12, 4))
plt.plot(fft_freqs, np.abs(fft_vals), color='r')
plt.xlabel("Frequency (Hz)")
plt.ylabel("Amplitude")
plt.title("EEG Frequency Spectrum (FFT)")
plt.grid()
plt.show()

f, t_spec, Sxx = spectrogram(eeg_signal, fs)

plt.figure(figsize=(12, 5))
plt.pcolormesh(t_spec, f, np.log(Sxx), shading='gouraud', cmap='jet')
plt.xlabel("Time (s)")
plt.ylabel("Frequency (Hz)")
plt.title("EEG Spectrogram (Time-Frequency Analysis)")
plt.colorbar(label="Log Power")
plt.show()
