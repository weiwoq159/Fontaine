import pathlib, sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent / "_shared"))
import taskkit


def main() -> None:
    payload = taskkit.read_input()
    taskkit.result(payload)


if __name__ == "__main__":
    main()
